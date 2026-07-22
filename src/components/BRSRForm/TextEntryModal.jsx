import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

// Generic free-text entry modal used by the BRSR wizard for long-form answers.
// Extracted from BRSRReportWizard as a self-contained presentational component.
const TextEntryModal = ({ isOpen, onClose, value, title, onSave }) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value, isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-navy border border-white/10 text-offwhite">
                <DialogHeader>
                    <DialogTitle className="text-xl font-playfair text-gold">{title || "Enter Details"}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <textarea
                        autoFocus
                        value={localValue || ""}
                        onChange={(e) => setLocalValue(e.target.value)}
                        className="w-full min-h-[300px] bg-white/5 border border-white/10 rounded-lg p-4 outline-none focus:border-gold/50 text-offwhite resize-y"
                        placeholder={`Enter details for ${title}...`}
                    />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-dimmed hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSave(localValue);
                            onClose();
                        }}
                        className="px-6 py-2 bg-gold text-navy font-bold rounded hover:bg-gold/90 transition-smooth"
                    >
                        Save & Apply
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TextEntryModal;
