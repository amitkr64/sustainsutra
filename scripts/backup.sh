#!/bin/bash
# ============================================================================
# SustainSutra - MongoDB Automated Backup Script
# ============================================================================
# Purpose: Automated database backups for production deployments
# Usage: Called by cron scheduler in docker-compose.prod.yml
#
# Configuration:
# - Schedule: Set BACKUP_SCHEDULE environment variable
# - Retention: Keep last 7 days by default
# - Compression: Enabled by default
#
# ============================================================================

set -e  # Exit on error
set -u  # Exit on undefined variable

# ============================================================================
# CONFIGURATION
# ============================================================================

# Backup retention (days)
RETENTION_DAYS=${BACKUP_RETENTION:-7}

# Backup directory
BACKUP_DIR="/data/backup"

# MongoDB connection
MONGO_HOST="${MONGO_URI:-mongodb}"
MONGO_PORT="${MONGO_PORT:-27017}"
MONGO_DB="${MONGO_INITDB_DATABASE:-sustainsutra}"

# Timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="mongodb_backup_${TIMESTAMP}"

# Log file
LOG_FILE="/var/log/mongodb-backup.log"

# ============================================================================
# FUNCTIONS
# ============================================================================

log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

error_exit() {
    log "ERROR: $1"
    exit 1
}

# ============================================================================
# PRE-BACKUP CHECKS
# ============================================================================

log "=========================================="
log "Starting MongoDB Backup: ${BACKUP_NAME}"
log "=========================================="

# Check if backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
    log "Creating backup directory: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR" || error_exit "Failed to create backup directory"
fi

# Check disk space (require at least 1GB free)
REQUIRED_SPACE_MB=1024
AVAILABLE_SPACE_MB=$(df -m "$BACKUP_DIR" | awk 'NR==2 {print $4}')

if [ "$AVAILABLE_SPACE_MB" -lt "$REQUIRED_SPACE_MB" ]; then
    error_exit "Insufficient disk space. Available: ${AVAILABLE_SPACE_MB}MB, Required: ${REQUIRED_SPACE_MB}MB"
fi

log "Available disk space: ${AVAILABLE_SPACE_MB}MB"

# ============================================================================
# PERFORM BACKUP
# ============================================================================

log "Database: ${MONGO_DB}"
log "Host: ${MONGO_HOST}:${MONGO_PORT}"
log "Backup directory: ${BACKUP_DIR}"

# Create temporary backup directory
TEMP_BACKUP_DIR="${BACKUP_DIR}/temp_${TIMESTAMP}"
mkdir -p "$TEMP_BACKUP_DIR" || error_exit "Failed to create temp directory"

# Run mongodump
log "Starting mongodump..."
if mongodump \
    --host="${MONGO_HOST}" \
    --port="${MONGO_PORT}" \
    --db="${MONGO_DB}" \
    --out="${TEMP_BACKUP_DIR}" \
    --gzip \
    --quiet; then
    log "✓ Mongodump completed successfully"
else
    error_exit "Mongodump failed"
fi

# Create archive
log "Creating compressed archive..."
ARCHIVE_NAME="${BACKUP_NAME}.tar.gz"
ARCHIVE_PATH="${BACKUP_DIR}/${ARCHIVE_NAME}"

if tar -czf "$ARCHIVE_PATH" -C "$TEMP_BACKUP_DIR" .; then
    log "✓ Archive created: ${ARCHIVE_NAME}"
    ARCHIVE_SIZE=$(du -h "$ARCHIVE_PATH" | cut -f1)
    log "Archive size: ${ARCHIVE_SIZE}"
else
    error_exit "Failed to create archive"
fi

# Remove temporary directory
log "Cleaning up temporary files..."
rm -rf "$TEMP_BACKUP_DIR"

# ============================================================================
# ROTATION & CLEANUP
# ============================================================================

log "Removing backups older than ${RETENTION_DAYS} days..."

# Find and remove old backups
OLD_BACKUPS=$(find "$BACKUP_DIR" -name "mongodb_backup_*.tar.gz" -type f -mtime +${RETENTION_DAYS})

if [ -n "$OLD_BACKUPS" ]; then
    echo "$OLD_BACKUPS" | while read -r old_backup; do
        log "Removing old backup: $(basename "$old_backup")"
        rm -f "$old_backup"
    done
    COUNT=$(echo "$OLD_BACKUPS" | wc -l)
    log "✓ Removed ${COUNT} old backup(s)"
else
    log "No old backups to remove"
fi

# List current backups
log "Current backups:"
find "$BACKUP_DIR" -name "mongodb_backup_*.tar.gz" -type f -printf "%T+ %p %s\n" | \
    sort -r | \
    awk '{printf "  - %s (%s bytes)\n", $2, $3}' | \
    tee -a "$LOG_FILE"

# ============================================================================
# VERIFICATION
# ============================================================================

log "Verifying backup archive..."
if tar -tzf "$ARCHIVE_PATH" > /dev/null 2>&1; then
    log "✓ Backup archive is valid"
else
    error_exit "Backup archive verification failed"
fi

# Calculate backup statistics
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "mongodb_backup_*.tar.gz" -type f | wc -l)

# ============================================================================
# COMPLETION
# ============================================================================

log "=========================================="
log "✓ Backup completed successfully!"
log "Backup: ${ARCHIVE_NAME}"
log "Size: ${ARCHIVE_SIZE}"
log "Total backups: ${BACKUP_COUNT}"
log "Total size: ${TOTAL_SIZE}"
log "=========================================="

# Optional: Send notification (configure as needed)
# send_notification "MongoDB backup completed: ${ARCHIVE_NAME}"

exit 0
