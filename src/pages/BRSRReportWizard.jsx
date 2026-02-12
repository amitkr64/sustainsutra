import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    ChevronLeft,
    ChevronRight,
    Save,
    CheckCircle,
    Search,
    Info,
    LayoutDashboard,
    ListChecks,
    Trash,
    Plus,
    ExternalLink,
    Edit3
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { BRSR_FIELDS } from '@/constants/brsrFields';
import { BRSR_UI_METADATA } from '@/constants/brsrUIMetadata';
import { applyBRSRCalculations } from '@/utils/brsrCalculations';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import NICSelector from '@/components/BRSRShared/NICSelector';


const HIERARCHY = [
    {
        id: 'section_a',
        title: 'Section A: General Disclosures',
        steps: [
            { id: 'a1', label: 'General Disclosures', key: 'Section A: General Disclosures' }
        ]
    },
    {
        id: 'section_b',
        title: 'Section B: Management and Process Disclosures',
        steps: [
            { id: 'b1', label: 'Management and Process', key: 'Section B: Management and Process Disclosures' }
        ]
    },
    {
        id: 'section_c',
        title: 'Section C: Principle-wise Performance',
        steps: [
            {
                id: 'p1',
                label: 'Principle 1',
                substeps: [
                    { id: 'p1_essential', label: 'Essential Indicators', key: 'Section C: Principle 1 Essential Indicators' },
                    { id: 'p1_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 1 Leadership Indicators' }
                ]
            },
            {
                id: 'p2',
                label: 'Principle 2',
                substeps: [
                    { id: 'p2_essential', label: 'Essential Indicators', key: 'Section C: Principle 2 Essential Indicators' },
                    { id: 'p2_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 2 Leadership Indicators' }
                ]
            },
            {
                id: 'p3',
                label: 'Principle 3',
                substeps: [
                    { id: 'p3_essential', label: 'Essential Indicators', key: 'Section C: Principle 3 Essential Indicators' },
                    { id: 'p3_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 3 Leadership Indicators' }
                ]
            },
            {
                id: 'p4',
                label: 'Principle 4',
                substeps: [
                    { id: 'p4_essential', label: 'Essential Indicators', key: 'Section C: Principle 4 Essential Indicators' },
                    { id: 'p4_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 4 Leadership Indicators' }
                ]
            },
            {
                id: 'p5', label: 'Principle 5', substeps: [
                    { id: 'p5_essential', label: 'Essential Indicators', key: 'Section C: Principle 5 Essential Indicators' },
                    { id: 'p5_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 5 Leadership Indicators' }
                ]
            },
            {
                id: 'p6', label: 'Principle 6', substeps: [
                    { id: 'p6_essential', label: 'Essential Indicators', key: 'Section C: Principle 6 Essential Indicators' },
                    { id: 'p6_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 6 Leadership Indicators' }
                ]
            },
            {
                id: 'p7', label: 'Principle 7', substeps: [
                    { id: 'p7_essential', label: 'Essential Indicators', key: 'Section C: Principle 7 Essential Indicators' },
                    { id: 'p7_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 7 Leadership Indicators' }
                ]
            },
            {
                id: 'p8', label: 'Principle 8', substeps: [
                    { id: 'p8_essential', label: 'Essential Indicators', key: 'Section C: Principle 8 Essential Indicators' },
                    { id: 'p8_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 8 Leadership Indicators' }
                ]
            },
            {
                id: 'p9', label: 'Principle 9', substeps: [
                    { id: 'p9_essential', label: 'Essential Indicators', key: 'Section C: Principle 9 Essential Indicators' },
                    { id: 'p9_leadership', label: 'Leadership Indicators', key: 'Section C: Principle 9 Leadership Indicators' }
                ]
            }
        ]
    }
];

// Flatten hierarchy for easier navigation/mapping
const WIZARD_STEPS = [];
HIERARCHY.forEach(section => {
    section.steps.forEach(step => {
        if (step.substeps) {
            step.substeps.forEach(sub => {
                WIZARD_STEPS.push({ ...sub, parentId: section.id, subParentId: step.id });
            });
        } else {
            WIZARD_STEPS.push({ ...step, parentId: section.id });
        }
    });
});

const BRSRReportWizard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { token } = useAuth();
    const [report, setReport] = useState({});
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Row Edit Modal State
    const [rowEditModalOpen, setRowEditModalOpen] = useState(false);
    const [editingRowMeta, setEditingRowMeta] = useState({ subsection: null, rowIndex: -1 });
    const [expandedSections, setExpandedSections] = useState({ 'section_c': true, 'p1': true });
    const [textModal, setTextModal] = useState({ open: false, value: '', title: '', onSave: null });
    const [nicModal, setNicModal] = useState({ open: false, value: '', onSave: null });

    const autoSaveTimer = useRef(null);

    const currentStep = WIZARD_STEPS[currentStepIdx];
    const currentSectionTitle = HIERARCHY.find(s => s.id === currentStep.parentId)?.title;

    useEffect(() => {
        fetchReport();
        return () => {
            if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
        };
    }, [id]);

    const fetchReport = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const { data } = await axios.get(`/api/brsr-reports/${id}`, config);
            const calculatedData = applyBRSRCalculations(data);
            setReport(calculatedData);
        } catch (error) {
            toast({
                title: "Error loading report",
                description: "Could not find the requested BRSR report.",
                variant: "destructive"
            });
            navigate('/brsr/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const triggerAutoSave = (updatedReport) => {
        if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
        autoSaveTimer.current = setTimeout(() => {
            saveReport(false, updatedReport);
        }, 1500);
    };

    const handleInputChange = (name, value) => {
        setReport(prev => {
            const next = { ...prev, [name]: value };
            // Apply automatic calculations for matrix fields
            const calculatedNext = applyBRSRCalculations(next);
            triggerAutoSave(calculatedNext);
            return calculatedNext;
        });
    };

    const openTextModal = (title, initialValue, onSave) => {
        setTextModal({ open: true, value: initialValue, title, onSave });
    };

    const openNicModal = (initialValue, onSave) => {
        setNicModal({ open: true, value: initialValue, onSave });
    };


    const handleMatrixChange = (fieldName, column, value) => {
        let currentData = {};
        try {
            currentData = report[fieldName] ? JSON.parse(report[fieldName]) : {};
        } catch (e) {
            console.error("Error parsing JSON for matrix field:", fieldName, e);
            currentData = {};
        }
        currentData[column] = value;
        handleInputChange(fieldName, JSON.stringify(currentData));
    };

    const saveReport = async (showToast = true, currentReport = report) => {
        try {
            setSaving(true);
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios.put(`/api/brsr-reports/${id}`, currentReport, config);
            if (showToast) {
                toast({
                    title: "Progress Saved",
                    description: "Your report has been updated successfully."
                });
            }
        } catch (error) {
            if (showToast) {
                toast({
                    title: "Save Failed",
                    description: "There was an error saving your changes.",
                    variant: "destructive"
                });
            }
        } finally {
            setSaving(false);
        }
    };

    const currentFields = BRSR_FIELDS.filter(f =>
        f.section === currentStep.key &&
        (searchQuery === '' || f.label.toLowerCase().includes(searchQuery.toLowerCase()) || f.name.includes(searchQuery.toLowerCase()))
    );

    const handleDynamicChange = (field, index, col, value, defaultRow, subsection) => {
        let reportData;
        try {
            reportData = report[field] ? JSON.parse(report[field]) : (subsection?.defaultRows || [defaultRow]);
        } catch (e) {
            reportData = subsection?.defaultRows || [defaultRow];
        }

        if (!Array.isArray(reportData)) {
            reportData = subsection?.defaultRows || [defaultRow];
        }

        if (!reportData[index]) {
            reportData[index] = { ...defaultRow };
        }

        reportData[index][col] = value;
        handleInputChange(field, JSON.stringify(reportData));
    };

    const handleAddRow = (storageField, defaultRow) => {
        let rows = [];
        try {
            rows = report[storageField] ? JSON.parse(report[storageField]) : [defaultRow];
        } catch (e) {
            rows = [defaultRow];
        }
        if (!Array.isArray(rows)) rows = [defaultRow];

        rows.push({ ...defaultRow });
        handleInputChange(storageField, JSON.stringify(rows));
    };

    const handleDeleteRow = (storageField, index) => {
        let rows = [];
        try {
            rows = report[storageField] ? JSON.parse(report[storageField]) : [];
        } catch (e) {
            rows = [];
        }
        if (!Array.isArray(rows)) return;

        const newRows = rows.filter((_, i) => i !== index);
        handleInputChange(storageField, JSON.stringify(newRows));
    };

    const handleNumericInput = (value) => {
        // Allow numbers and a single decimal point
        return value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    };

    const renderFieldInput = (field, disabled = false, inTable = false) => {
        const value = report[field.name] || '';
        const isCompact = inTable || field.inTable;

        const commonClass = isCompact
            ? `w-full bg-transparent border-none text-sm text-offwhite focus:ring-1 focus:ring-gold/50 outline-none px-1 py-1 h-8 ${disabled || field.readOnly ? 'opacity-40' : ''}`
            : `w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-offwhite focus:bg-black/30 focus:border-gold shadow-inner outline-none transition-smooth ${disabled || field.readOnly ? 'opacity-40 cursor-not-allowed' : ''}`;

        switch (field.uiType) {
            case 'popup':
                const isTablePopup = field.subType === 'table';
                const buttonLabel = field.buttonLabel || (value ? (isCompact ? "Edit" : "View/Edit Saved Details") : (isCompact ? "Add" : "Add Details"));
                const buttonColor = field.buttonColor || (isCompact ? "text-blue-400" : "text-gold");
                const isNotes = field.name === 'q28_notes';

                return (
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                disabled={disabled}
                                className={isCompact
                                    ? `flex items-center gap-1 text-[10px] uppercase hover:text-blue-300 transition-colors ${buttonColor} ${disabled ? 'opacity-30' : ''}`
                                    : isNotes
                                        ? "bg-white/10 text-offwhite border border-white/20 px-6 py-2 rounded-lg text-sm hover:bg-white/20 transition-all font-medium"
                                        : `flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-lg hover:bg-white/10 transition-smooth w-full text-left ${buttonColor} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`
                                }
                            >
                                {!isNotes && (value ? <CheckCircle size={isCompact ? 12 : 16} className="text-green-400" /> : <Plus size={isCompact ? 12 : 16} className="text-gold" />)}
                                <span className={!isCompact && !value ? "text-dimmed" : ""}>
                                    {buttonLabel}
                                </span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className={`${isTablePopup ? 'max-w-6xl' : 'max-w-4xl'} bg-navy border border-white/10 text-offwhite`}>
                            <DialogHeader>
                                <DialogTitle className="text-gold font-playfair text-xl">{field.label}</DialogTitle>
                                <DialogDescription className="text-dimmed">
                                    {isTablePopup ? 'Fill in the table details below.' : 'Enter the detailed information below.'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                                {isTablePopup ? (
                                    <div className="overflow-x-auto max-h-[70vh] p-1">
                                        <table className="w-full text-sm text-center border-collapse mb-4">
                                            <thead>
                                                {field.headerRows ? (
                                                    field.headerRows.map((hRow, hIdx) => (
                                                        <tr key={hIdx} className="bg-white/10">
                                                            {hRow.map((col, cIdx) => (
                                                                <th
                                                                    key={cIdx}
                                                                    className="p-3 border border-white/10 text-gold font-medium text-center"
                                                                    colSpan={col.colSpan || 1}
                                                                    rowSpan={col.rowSpan || 1}
                                                                >
                                                                    {col.label}
                                                                </th>
                                                            ))}
                                                            {hIdx === 0 && (
                                                                <th
                                                                    className="p-3 border border-white/10 text-gold font-medium text-center"
                                                                    rowSpan={field.headerRows.length}
                                                                >
                                                                    Actions
                                                                </th>
                                                            )}
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr className="bg-white/10">
                                                        {field.columns.map(col => (
                                                            <th key={col.id} className="p-3 border border-white/10 text-gold font-medium">{col.label}</th>
                                                        ))}
                                                        <th className="p-3 border border-white/10 text-gold font-medium w-20 text-center">Actions</th>
                                                    </tr>
                                                )}
                                            </thead>
                                            <tbody>
                                                {(() => {
                                                    let rows = [];
                                                    try {
                                                        rows = report[field.name] ? JSON.parse(report[field.name]) : [field.defaultRow];
                                                    } catch (e) { rows = [field.defaultRow]; }
                                                    if (!Array.isArray(rows) || rows.length === 0) rows = [field.defaultRow];

                                                    return rows.map((row, rowIdx) => (
                                                        <tr key={rowIdx} className="hover:bg-white/5">
                                                            {field.columns.map(col => (
                                                                <td key={col.id} className="p-2 border border-white/10">
                                                                    {col.id === 'sno' ? rowIdx + 1 : (
                                                                        (field.columnOptions?.[col.id] || (col.uiType === 'select' && col.options)) ? (
                                                                            <select
                                                                                className="w-full bg-transparent outline-none focus:text-gold px-1 py-1 appearance-none"
                                                                                value={row[col.id] || ''}
                                                                                onChange={(e) => handleDynamicChange(field.name, rowIdx, col.id, e.target.value, field.defaultRow)}
                                                                            >
                                                                                <option value="">Select...</option>
                                                                                {(field.columnOptions?.[col.id] || col.options).map(opt => (
                                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                                ))}
                                                                            </select>
                                                                        ) : (
                                                                            <input
                                                                                type="text"
                                                                                className="w-full bg-transparent outline-none focus:text-gold px-1"
                                                                                value={row[col.id] || ''}
                                                                                onChange={(e) => {
                                                                                    const val = (col.uiType === 'number' || col.dataType === 'number') ? handleNumericInput(e.target.value) : e.target.value;
                                                                                    handleDynamicChange(field.name, rowIdx, col.id, val, field.defaultRow);
                                                                                }}
                                                                                placeholder="-"
                                                                            />
                                                                        )
                                                                    )}
                                                                </td>
                                                            ))}
                                                            <td className="p-2 border border-white/10 text-center">
                                                                <button
                                                                    onClick={() => handleDeleteRow(field.name, rowIdx, field.defaultRow)}
                                                                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                                >
                                                                    <Trash size={16} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ));
                                                })()}
                                            </tbody>
                                        </table>
                                        <button
                                            onClick={() => handleAddRow(field.name, field.defaultRow)}
                                            className="flex items-center gap-2 text-gold hover:text-white bg-gold/10 hover:bg-gold/20 px-4 py-2 rounded-lg transition-all text-sm font-bold border border-gold/30"
                                        >
                                            <Plus size={16} /> Add More
                                        </button>
                                    </div>
                                ) : (
                                    <textarea
                                        className="w-full h-[60vh] bg-black/20 border border-white/10 rounded-lg p-4 text-offwhite focus:border-gold outline-none resize-none font-mono text-sm leading-relaxed"
                                        value={value}
                                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                                        placeholder={`Type here...`}
                                    />
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                );
            case 'textarea':
                if (isCompact) {
                    return (
                        <button
                            onClick={() => openTextModal(field.label, value, (newVal) => handleInputChange(field.name, newVal))}
                            disabled={disabled}
                            className={`flex items-center justify-center gap-1 w-full text-xs text-gold hover:text-white bg-gold/10 p-2 rounded border border-gold/20 transition-all font-medium py-1 min-h-[32px] ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                            <Edit3 size={12} />
                            {value ? "Edit..." : "Add..."}
                        </button>
                    );
                }
                return (
                    <textarea
                        className={`${commonClass} min-h-[100px] py-3 resize-y`}
                        value={value}
                        disabled={disabled}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={`Enter ${field.label || 'details'}...`}
                    />
                );
            case 'nic_search':
                return (
                    <button
                        onClick={() => openNicModal(value, (newVal) => handleInputChange(field.name, newVal))}
                        disabled={disabled}
                        className={`flex items-center justify-between w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-offwhite hover:bg-black/30 hover:border-gold transition-smooth ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                        <span className={!value ? "text-dimmed" : "text-gold font-mono"}>{value || "Search NIC Codes..."}</span>
                        <Search size={16} className="text-gold" />
                    </button>
                );
            case 'text':

            case 'number':
                return (
                    <input
                        type="text"
                        className={commonClass}
                        value={value}
                        disabled={disabled || field.readOnly}
                        onChange={(e) => {
                            const val = (field.uiType === 'number' || field.dataType === 'number') ? handleNumericInput(e.target.value) : e.target.value;
                            handleInputChange(field.name, val);
                        }}
                        placeholder="-"
                    />
                );
            case 'select':
                return (
                    <select
                        className={commonClass}
                        disabled={disabled}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        value={value}
                    >
                        <option value="">{isCompact ? "-" : "Select option..."}</option>
                        {field.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                );
            case 'date':
                return (
                    <input
                        type="date"
                        className={commonClass}
                        disabled={disabled}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        value={value}
                    />
                );
            default:
                return (
                    <input
                        className={commonClass}
                        value={value}
                        disabled={disabled}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={isCompact ? "-" : `Enter ${field.label}...`}
                    />
                );
        }
    };


    const checkDependency = (dep, context = report) => {
        if (!dep) return false;

        // Handle string dependency (legacy support)
        if (typeof dep === 'string') {
            return !report[dep] || report[dep] === 'No';
        }

        const { field, value, operator, id: colId, rowField, rowValue } = dep;

        // Handle row-level dependency
        if (rowField && rowValue && context) {
            return context[rowField] !== rowValue;
        }

        const targetValue = colId ? (context[colId] || '') : (report[field] || '');
        if (operator === 'not') return targetValue === value;
        if (Array.isArray(value)) return !value.includes(targetValue);
        return targetValue !== value;
    };

    const renderStructuredSection = (metadata) => {
        const checkMatrixDependency = (dep, currentCol) => {
            if (!dep) return false;
            const { row: depRowName, value: depValue, operator } = dep;

            let currentVal = '';
            try {
                const data = report[depRowName] ? JSON.parse(report[depRowName]) : {};
                currentVal = data[currentCol] || '';
            } catch (e) {
                currentVal = '';
            }

            if (operator === 'not') {
                if (Array.isArray(depValue)) return depValue.includes(currentVal);
                return currentVal === depValue;
            }

            if (Array.isArray(depValue)) return !depValue.includes(currentVal);
            return currentVal !== depValue;
        };

        const renderMatrixInput = (row, col) => {
            const isDisabled = checkMatrixDependency(row.matrixDependsOn, col);

            // If the row has a dependency and it's not met for this column, show a dash
            if (row.matrixDependsOn && isDisabled) {
                return <span className="text-white/10 opacity-50">-</span>;
            }

            let val = '';
            if (row.isFixed) {
                try {
                    const data = report[row.name] ? JSON.parse(report[row.name]) : {};
                    val = data[col] || '';
                } catch (e) {
                    val = '';
                }
            } else {
                // For dynamic rows, data is stored directly in the row object
                val = row[col] || '';
            }

            const onValueChange = (newVal) => {
                if (row.isFixed) {
                    handleMatrixChange(row.name, col, newVal);
                } else {
                    // Update dynamic rows in the subsection's storageField
                    const subsection = metadata.find(s => s.storageField === row.storageField) || row.subsection; // Fallback
                    if (subsection && subsection.storageField) {
                        try {
                            const dynamicRows = report[subsection.storageField] ? JSON.parse(report[subsection.storageField]) : [];
                            if (dynamicRows[row.index]) {
                                dynamicRows[row.index][col] = newVal;
                                handleInputChange(subsection.storageField, JSON.stringify(dynamicRows));
                            }
                        } catch (e) {
                            console.error("Error updating dynamic matrix row:", e);
                        }
                    } else if (row.storageField) { // Direct fallback if subsection not found
                        try {
                            const dynamicRows = report[row.storageField] ? JSON.parse(report[row.storageField]) : [];
                            if (dynamicRows[row.index]) {
                                dynamicRows[row.index][col] = newVal;
                                handleInputChange(row.storageField, JSON.stringify(dynamicRows));
                            }
                        } catch (e) {
                            console.error("Error updating dynamic matrix row:", e);
                        }
                    }
                }
            };

            if (row.inputType === 'select') {
                return (
                    <select
                        className={`w-full bg-transparent outline-none focus:text-gold text-center appearance-none cursor-pointer transition-opacity ${isDisabled ? 'opacity-30' : ''}`}
                        value={val}
                        disabled={isDisabled}
                        onChange={(e) => onValueChange(e.target.value)}
                    >
                        <option value="">-</option>
                        {row.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                );
            }

            if (row.inputType === 'popup') {
                const isTable = row.subType === 'table';
                const buttonColor = row.buttonColor || "text-gold";
                const buttonLabel = row.buttonLabel || (val ? "Edit" : "Add");

                return (
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                disabled={isDisabled}
                                className={`flex items-center justify-center w-full text-[10px] uppercase hover:opacity-80 transition-all ${buttonColor} ${isDisabled ? 'opacity-30' : ''}`}
                            >
                                {val ? <CheckCircle size={10} className="mr-1 text-green-400" /> : <Plus size={10} className="mr-1 border border-current rounded-full p-[1px]" />}
                                {buttonLabel}
                            </button>
                        </DialogTrigger>
                        <DialogContent className={`${isTable ? 'max-w-4xl' : 'max-w-2xl'} bg-navy border border-white/10 text-offwhite shadow-2xl`}>
                            <DialogHeader>
                                <DialogTitle className="text-gold font-playfair text-xl">{row.label} - Principle {col}</DialogTitle>
                                <DialogDescription className="text-dimmed">
                                    {isTable ? 'Add multiple specific reasons below.' : 'Enter detailed information below.'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                                {isTable ? (
                                    <div className="overflow-x-auto max-h-[60vh] p-1 custom-scrollbar">
                                        <table className="w-full text-sm text-left border-collapse mb-4">
                                            <thead>
                                                <tr className="bg-white/10">
                                                    {row.columns.map(c => (
                                                        <th key={c.id} className="p-3 border border-white/10 text-gold font-medium">{c.label}</th>
                                                    ))}
                                                    <th className="p-3 border border-white/10 text-gold font-medium w-20 text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(() => {
                                                    let rows = [];
                                                    try { rows = val ? JSON.parse(val) : [row.defaultRow]; } catch (e) { rows = [row.defaultRow]; }
                                                    if (!Array.isArray(rows)) rows = [row.defaultRow];

                                                    return rows.map((r, rIdx) => (
                                                        <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                                                            {row.columns.map(c => (
                                                                <td key={c.id} className="p-2 border border-white/10">
                                                                    {c.id === 'sno' ? rIdx + 1 : (
                                                                        c.uiType === 'textarea' ? (
                                                                            <textarea
                                                                                className="w-full bg-black/20 border border-white/5 rounded p-2 text-sm outline-none focus:border-gold min-h-[60px]"
                                                                                value={r[c.id] || ''}
                                                                                onChange={(e) => {
                                                                                    const newRows = [...rows];
                                                                                    newRows[rIdx] = { ...newRows[rIdx], [c.id]: e.target.value };
                                                                                    handleMatrixChange(row.name, col, JSON.stringify(newRows));
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <input
                                                                                type="text"
                                                                                className="w-full bg-black/20 border border-white/5 rounded p-2 text-sm outline-none focus:border-gold"
                                                                                value={r[c.id] || ''}
                                                                                onChange={(e) => {
                                                                                    const newRows = [...rows];
                                                                                    newRows[rIdx] = { ...newRows[rIdx], [c.id]: e.target.value };
                                                                                    handleMatrixChange(row.name, col, JSON.stringify(newRows));
                                                                                }}
                                                                            />
                                                                        )
                                                                    )}
                                                                </td>
                                                            ))}
                                                            <td className="p-2 border border-white/10 text-center">
                                                                <button
                                                                    onClick={() => {
                                                                        const newRows = rows.filter((_, i) => i !== rIdx);
                                                                        handleMatrixChange(row.name, col, JSON.stringify(newRows.length > 0 ? newRows : [row.defaultRow]));
                                                                    }}
                                                                    className="text-red-400 hover:text-red-300 transition-colors p-2"
                                                                    title="Remove row"
                                                                >
                                                                    <Trash size={14} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ));
                                                })()}
                                            </tbody>
                                        </table>
                                        <button
                                            onClick={() => {
                                                let rows = [];
                                                try { rows = val ? JSON.parse(val) : []; } catch (e) { rows = []; }
                                                const newRows = [...rows, { ...row.defaultRow }];
                                                handleMatrixChange(row.name, col, JSON.stringify(newRows));
                                            }}
                                            className="flex items-center gap-2 text-gold hover:text-white bg-gold/10 hover:bg-gold/20 px-4 py-2 rounded-lg transition-all text-sm font-bold border border-gold/30 shadow-lg"
                                        >
                                            <Plus size={16} /> Add More Reasons
                                        </button>
                                    </div>
                                ) : (
                                    <textarea
                                        className="w-full h-[50vh] bg-black/20 border border-white/10 rounded-lg p-4 text-offwhite focus:border-gold outline-none resize-none shadow-inner"
                                        value={val}
                                        onChange={(e) => handleMatrixChange(row.name, col, e.target.value)}
                                        placeholder="Enter details..."
                                    />
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                );
            }

            if (row.inputType === 'textarea') {
                return (
                    <button
                        onClick={() => openTextModal(row.label, val, (newVal) => onValueChange(newVal))}
                        disabled={isDisabled}
                        className={`flex items-center justify-center w-full text-[10px] text-gold hover:text-white transition-all ${isDisabled ? 'opacity-30' : ''}`}
                    >
                        <Edit3 size={10} className="mr-1" />
                        {val ? "Edit..." : "Add..."}
                    </button>
                );
            }

            return (
                <input
                    type="text"
                    className={`w-full bg-transparent outline-none focus:text-gold text-center px-1 transition-opacity ${isDisabled ? 'opacity-30' : ''}`}
                    value={val}
                    disabled={isDisabled}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            );
        };

        const renderTableContent = (subsection) => {
            const isRowPopup = subsection.useRowPopup;
            const tableColumns = isRowPopup
                ? subsection.columns.filter(c => subsection.mainColumns?.includes(c.id))
                : subsection.columns;

            return (
                <div className="mb-4">
                    <table className="w-full text-sm text-center border-collapse">
                        <thead>
                            {subsection.headerRows ? (
                                subsection.headerRows.map((hRow, hIdx) => (
                                    <tr key={hIdx} className="bg-white/10">
                                        {hRow.map((col, cIdx) => (
                                            <th
                                                key={cIdx}
                                                className="p-3 border border-white/10 text-gold font-medium text-center"
                                                colSpan={col.colSpan || 1}
                                                rowSpan={col.rowSpan || 1}
                                            >
                                                {col.label}
                                            </th>
                                        ))}
                                        {/* Add Actions column to headerRows if dynamic */}
                                        {hIdx === 0 && ((subsection.dynamic && !subsection.disableAddDelete) || isRowPopup) && (
                                            <th
                                                className="p-3 border border-white/10 text-gold font-medium text-center"
                                                rowSpan={subsection.headerRows.length}
                                            >
                                                {isRowPopup ? "Details" : "Actions"}
                                            </th>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white/10">
                                    {tableColumns.map(col => (
                                        <th key={col.id} className="p-2 border border-white/10 text-gold font-medium text-center">{col.label}</th>
                                    ))}
                                    {((subsection.dynamic && !subsection.disableAddDelete) || isRowPopup) && (
                                        <th className="p-2 border border-white/10 text-gold font-medium w-20 text-center">
                                            {isRowPopup ? "Details" : "Actions"}
                                        </th>
                                    )}
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {subsection.dynamic ? (() => {
                                let rows = [];
                                try {
                                    const parsed = report[subsection.storageField] ? JSON.parse(report[subsection.storageField]) : null;

                                    if (parsed && Array.isArray(parsed) && parsed.length > 0) {
                                        rows = [...parsed];
                                        // Ensure all required rows from defaultRows are present (crucial for split tables like P3 Q1)
                                        if (subsection.defaultRows) {
                                            subsection.defaultRows.forEach(defRow => {
                                                if (defRow.id && !rows.find(r => r.id === defRow.id)) {
                                                    // Only add if it doesn't exist by ID
                                                    rows.push({ ...defRow });
                                                }
                                            });
                                        }
                                    } else {
                                        rows = subsection.defaultRows || (subsection.defaultRow ? [subsection.defaultRow] : []);
                                    }
                                } catch (e) {
                                    rows = subsection.defaultRows || (subsection.defaultRow ? [subsection.defaultRow] : []);
                                }

                                // Apply dynamicRowCount if specified
                                if (subsection.dynamicRowCount) {
                                    const countField = subsection.dynamicRowCount.field;
                                    const maxRows = subsection.dynamicRowCount.max || 10;
                                    const targetCount = Math.min(parseInt(report[countField]) || 0, maxRows);

                                    // Adjust rows to match the target count
                                    if (targetCount > 0) {
                                        if (rows.length < targetCount) {
                                            // Add rows if needed
                                            while (rows.length < targetCount) {
                                                rows.push({ ...subsection.defaultRow });
                                            }
                                        } else if (rows.length > targetCount) {
                                            // Remove excess rows
                                            rows = rows.slice(0, targetCount);
                                        }
                                    }
                                }

                                // Apply rowFilter if specified (for P3 Q1 parts a/b)
                                if (subsection.rowFilter && Array.isArray(subsection.rowFilter)) {
                                    rows = rows.filter(row => subsection.rowFilter.includes(row.id));
                                }

                                // Filter out legacy 'Other (please specify)' row for Q26 to avoid duplicates with the new inline system
                                if (subsection.id === 'q26_transparency') {
                                    rows = rows.filter(row => row.particulars !== 'Other (please specify)');
                                }

                                return rows.map((row, rowIdx) => {
                                    if (!row) return null;

                                    // 1. Handle Header Rows
                                    if (row.isHeader) {
                                        const colSpan = tableColumns.length + ((subsection.dynamic && !subsection.disableAddDelete) || isRowPopup ? 1 : 0);
                                        return (
                                            <tr key={`header-${rowIdx}`} className="bg-white/10">
                                                <td colSpan={colSpan} className="p-3 border border-white/10 text-left pl-4 font-bold text-gold tracking-wider uppercase bg-white/5">
                                                    {row.category || row.label || "Section"}
                                                </td>
                                            </tr>
                                        );
                                    }

                                    // 2. Handle Data Rows
                                    return (
                                        <tr key={`row-${rowIdx}`} className="hover:bg-white/5 transition-colors">
                                            {tableColumns.map(col => (
                                                <td key={col.id} className="p-2 border border-white/10">
                                                    {col.id === 'sno' ? rowIdx + 1 : renderDynamicField(subsection, row, col, rowIdx, checkDependency(col.dependsOn, row))}
                                                </td>
                                            ))}
                                            {((subsection.dynamic && !subsection.disableAddDelete) || isRowPopup) && (
                                                <td className="p-2 border border-white/10 text-center">
                                                    {isRowPopup ? (
                                                        <button
                                                            onClick={() => {
                                                                if (subsection && rowIdx !== -1) {
                                                                    setEditingRowMeta({ subsection, rowIndex: rowIdx });
                                                                    setRowEditModalOpen(true);
                                                                }
                                                            }}
                                                            className="text-blue-400 hover:text-blue-300 transition-colors p-1 flex items-center justify-center w-full gap-1"
                                                        >
                                                            <Edit3 size={14} /> <span className="text-[10px] uppercase">Edit</span>
                                                        </button>
                                                    ) : (
                                                        !subsection.disableAddDelete && !row.readOnlyParticulars && (
                                                            <button
                                                                onClick={() => handleDeleteRow(subsection.storageField, rowIdx)}
                                                                className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                            >
                                                                <Trash size={14} />
                                                            </button>
                                                        )
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                    );
                                });
                            })() : (
                                // STATIC TABLE RENDERING (RESTORED)
                                subsection.rows && subsection.rows.map((row, rowIdx) => (
                                    <tr key={rowIdx} className={row.isHeader ? "bg-white/10" : "hover:bg-white/5 transition-colors"}>
                                        {row.isHeader ? (
                                            <td
                                                colSpan={subsection.columns.length}
                                                className="p-3 border border-white/10 text-left pl-4 font-bold text-gold tracking-wider uppercase bg-white/5"
                                            >
                                                {row.label}
                                            </td>
                                        ) : (
                                            subsection.columns.map(col => {
                                                const field = subsection.fields?.find(f => f.row === row.id && f.mapping === col.id);
                                                if (!field) {
                                                    return <td key={col.id} className="p-2 border border-white/10 text-center">{row[col.id] || row.label || '-'}</td>;
                                                }

                                                const isDisabled = subsection.disabledCells?.some(dc => dc.rowId === row.id && dc.colId === col.id);
                                                const isConditionallyDisabled = checkDependency(field.dependsOn);
                                                const effectivelyDisabled = isDisabled || isConditionallyDisabled || field.readOnly;

                                                if (isConditionallyDisabled && !field.showWhenDisabled) {
                                                    return <td key={col.id} className="p-2 border border-white/10 text-center bg-white/5"><span className="text-white/10 opacity-30">-</span></td>;
                                                }

                                                return (
                                                    <td key={col.id} className="p-2 border border-white/10">
                                                        {field.mapping === 'parameter' && (
                                                            <div className="text-[10px] text-left opacity-60 mb-1 leading-tight uppercase font-bold tracking-wider">
                                                                {row.label}
                                                            </div>
                                                        )}
                                                        {renderFieldInput(field, effectivelyDisabled, true)}
                                                    </td>
                                                );
                                            })
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {subsection.dynamic && !subsection.disableAddDelete && !isRowPopup && (
                        <div className="mt-4">
                            <button
                                onClick={() => handleAddRow(subsection.storageField, subsection.defaultRow)}
                                className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold rounded border border-gold/30 transition-colors"
                            >
                                <Plus size={18} />
                                <span>Add Details</span>
                            </button>
                        </div>
                    )}
                </div>
            );
        };

        const renderDynamicField = (subsection, row, col, rowIdx, isDisabled) => {
            if (!row || !col) return null;
            const val = row[col.id] || '';
            const onChange = (e) => handleDynamicChange(subsection.storageField, rowIdx, col.id, e.target.value, subsection.defaultRow || {}, subsection);


            // Handle column-specific options (legacy support)
            if (subsection.columnOptions?.[col.id]) {
                return (
                    <select
                        className={`w-full bg-transparent outline-none focus:text-gold px-1 py-1 appearance-none ${isDisabled ? 'opacity-30' : ''}`}
                        value={val}
                        disabled={isDisabled}
                        onChange={onChange}
                    >
                        <option value="">Select...</option>
                        {subsection.columnOptions[col.id].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                );
            }

            // Handle select dropdown with options defined in column
            if (col.uiType === 'select' && col.options) {
                return (
                    <select
                        className={`w-full bg-transparent outline-none focus:text-gold px-1 py-1 appearance-none ${isDisabled ? 'opacity-30' : ''}`}
                        value={val}
                        disabled={isDisabled}
                        onChange={onChange}
                    >
                        <option value="">Select...</option>
                        {col.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                );
            }

            if (col.uiType === 'textarea') {
                const buttonLabel = col.buttonLabel || (val ? "Edit Details" : "Add Details");
                const buttonColor = col.buttonColor || "text-gold";
                const isNotes = col.name === 'q28_notes' || col.id === 'q28_notes';

                return (
                    <button
                        onClick={() => openTextModal(col.label, val, (newVal) => handleDynamicChange(subsection.storageField, rowIdx, col.id, newVal, subsection.defaultRow, subsection))}
                        disabled={isDisabled}
                        className={isNotes
                            ? "bg-white/10 text-offwhite border border-white/20 px-4 py-1.5 rounded text-xs hover:bg-white/20 transition-all font-medium"
                            : `flex items-center justify-center gap-2 w-full text-xs hover:text-white transition-all font-medium py-1.5 min-h-[36px] ${buttonColor} ${isDisabled ? 'opacity-30 cursor-not-allowed text-dimmed' : ''}`
                        }
                    >
                        {!isNotes && <Edit3 size={14} className={val ? "text-gold" : "text-dimmed"} />}
                        <span className="truncate">{buttonLabel}</span>
                    </button>
                );
            }

            if (col.uiType === 'nic_search') {
                return (
                    <button
                        onClick={() => openNicModal(val, (newVal) => handleDynamicChange(subsection.storageField, rowIdx, col.id, newVal, subsection.defaultRow, subsection))}
                        disabled={isDisabled}
                        className={`flex items-center justify-center gap-1 w-full text-xs text-gold hover:text-white bg-gold/10 p-2 rounded border border-gold/20 transition-all font-medium py-1 min-h-[32px] ${isDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                        <Search size={12} />
                        {val || "Search..."}
                    </button>
                );
            }


            const isParticularsReadOnly = col.id === 'particulars' && row.readOnlyParticulars;
            const effectivelyReadOnly = col.id === 'sno' || col.readOnly || isParticularsReadOnly || (subsection.disableAddDelete && (col.id === 'segment' || col.id === 'category'));

            // Special handling for Q26 'Other' stakeholder formatting: wrap input in "Others (...)"
            if (subsection.id === 'q26_transparency' && col.id === 'particulars' && !row.readOnlyParticulars) {
                const currentVal = val ? val.toString() : '';
                const rawValue = currentVal.startsWith('Others (') && currentVal.endsWith(')')
                    ? currentVal.slice(8, -1)
                    : currentVal;

                return (
                    <div className="flex items-center gap-0.5 text-[11px] min-w-[140px] justify-center">
                        <span className="text-gold/80 font-bold whitespace-nowrap">Others (</span>
                        <input
                            type="text"
                            className="bg-white/5 border-b border-white/10 outline-none focus:border-gold px-1 w-full text-center text-offwhite py-0.5"
                            value={rawValue}
                            onChange={(e) => {
                                const newVal = e.target.value ? `Others (${e.target.value})` : '';
                                handleDynamicChange(subsection.storageField, rowIdx, col.id, newVal, subsection.defaultRow || {}, subsection);
                            }}
                            placeholder="specify..."
                        />
                        <span className="text-gold/80 font-bold">)</span>
                    </div>
                );
            }


            return (
                <input
                    type="text"
                    className={`w-full bg-transparent outline-none focus:text-gold px-1 ${isDisabled || col.readOnly || isParticularsReadOnly ? 'opacity-30' : ''}`}
                    value={val}
                    disabled={isDisabled || col.readOnly || isParticularsReadOnly}
                    readOnly={effectivelyReadOnly}
                    onChange={(e) => {
                        const value = (col.uiType === 'number' || col.dataType === 'number') ? handleNumericInput(e.target.value) : e.target.value;
                        handleDynamicChange(subsection.storageField, rowIdx, col.id, value, subsection.defaultRow || {}, subsection);
                    }}
                    placeholder="-"
                />
            );
        };

        return (
            <div className="space-y-12">
                {metadata.map((subsection) => {
                    const isSubsectionDisabled = subsection.dependsOn ? checkDependency(subsection.dependsOn) : false;

                    if (isSubsectionDisabled) return null;

                    return (
                        <div key={subsection.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-playfair text-gold mb-6 border-b border-white/10 pb-2">
                                {subsection.title}
                            </h3>

                            {subsection.type === 'grid' && (
                                <div className={`grid grid-cols-1 md:grid-cols-${subsection.columns || 2} gap-6`}>
                                    {subsection.fields.map(field => {
                                        const isDisabled = checkDependency(field.dependsOn);
                                        if (isDisabled && field.dependsOn) return null; // Hide if dependency not met
                                        return (
                                            <div key={field.name || field.id} className={field.type === 'group' ? 'md:col-span-2' : ''}>
                                                {field.type === 'group' ? (
                                                    <div className="space-y-4">
                                                        <label className="text-sm font-bold text-offwhite/80">{field.label}</label>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                                                            {field.fields.map(subField => (
                                                                <div key={subField.name}>
                                                                    <label className="text-xs text-dimmed mb-1 block">{subField.label}</label>
                                                                    {renderFieldInput(subField, isDisabled)}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-offwhite/80">{field.label}</label>
                                                        {renderFieldInput(field, isDisabled)}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {subsection.type === 'table' && (
                                subsection.popup ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-bold text-offwhite/80">{subsection.label}</label>
                                        </div>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-gold/90 transition-smooth shadow-lg shadow-gold/20">
                                                    <ExternalLink size={18} /> Open Data Table
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto bg-navy border border-white/10 text-offwhite">
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl font-playfair text-gold mb-4">{subsection.label}</DialogTitle>
                                                    <DialogDescription className="sr-only">
                                                        Data table for {subsection.label}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="overflow-x-auto mt-4">
                                                    {renderTableContent(subsection)}
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-sm font-bold text-offwhite/80">{subsection.label}</label>
                                            {subsection.helperLink && (
                                                <button
                                                    onClick={() => window.open(subsection.helperLink, '_blank')}
                                                    className="flex items-center gap-2 text-xs text-gold hover:text-gold/80 transition-smooth bg-gold/10 px-3 py-1.5 rounded-full border border-gold/30"
                                                >
                                                    <ExternalLink size={12} /> NIC Code List
                                                </button>
                                            )}
                                        </div>
                                        {renderTableContent(subsection)}

                                        {subsection.note && (
                                            <div className="mt-6 pt-6 border-t border-white/10">
                                                <label className="text-sm font-bold text-offwhite/80 mb-2 block">{subsection.note.label}</label>
                                                {renderFieldInput(subsection.note)}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}

                            {subsection.type === 'matrix' && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-center border-collapse">
                                        <thead>
                                            <tr className="bg-white/10">
                                                <th className="p-3 border border-white/10 text-gold font-medium text-left min-w-[300px]">Indicator</th>
                                                {subsection.columns.map(col => (
                                                    <th key={col} className="p-3 border border-white/10 text-gold font-medium min-w-[60px]">{col}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(() => {
                                                const fixedRows = subsection.rows || [];
                                                let dynamicRows = [];
                                                if (subsection.dynamic && subsection.storageField) {
                                                    try {
                                                        dynamicRows = report[subsection.storageField] ? JSON.parse(report[subsection.storageField]) : [];
                                                    } catch (e) {
                                                        dynamicRows = [];
                                                    }
                                                }

                                                const allRows = [
                                                    ...fixedRows.map(r => ({ ...r, isFixed: true })),
                                                    ...dynamicRows.map((r, i) => ({
                                                        ...subsection.defaultDynamicRow, // Inherit inputType, options, matrixDependsOn
                                                        ...r,
                                                        isFixed: false,
                                                        index: i,
                                                        storageField: subsection.storageField
                                                    }))
                                                ];

                                                return allRows.map((row, idx) => {
                                                    const rowLabel = row.label;
                                                    const isFixed = row.isFixed;

                                                    return (
                                                        <tr key={idx} className={row.isHeader ? "bg-white/10" : "hover:bg-white/5"}>
                                                            <td
                                                                className={`p-3 border border-white/10 text-offwhite/80 text-left ${row.isHeader ? 'font-bold text-gold uppercase text-[10px] tracking-widest' : ''}`}
                                                                colSpan={row.isHeader ? subsection.columns.length + 1 : 1}
                                                            >
                                                                {!isFixed ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <input
                                                                            type="text"
                                                                            className="w-full bg-transparent border-b border-white/10 focus:border-gold outline-none py-1 text-sm font-medium"
                                                                            value={rowLabel}
                                                                            onChange={(e) => {
                                                                                const newDynamicRows = [...dynamicRows];
                                                                                newDynamicRows[row.index] = { ...newDynamicRows[row.index], label: e.target.value };
                                                                                handleInputChange(subsection.storageField, JSON.stringify(newDynamicRows));
                                                                            }}
                                                                        />
                                                                        <button
                                                                            onClick={() => {
                                                                                const newDynamicRows = dynamicRows.filter((_, i) => i !== row.index);
                                                                                handleInputChange(subsection.storageField, JSON.stringify(newDynamicRows));
                                                                            }}
                                                                            className="text-red-400 hover:text-red-300 p-1"
                                                                        >
                                                                            <Trash size={12} />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    rowLabel
                                                                )}
                                                            </td>
                                                            {!row.isHeader && subsection.columns.map(col => (
                                                                <td key={col} className="p-2 border border-white/10">
                                                                    {renderMatrixInput(row, col)}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    );
                                                });
                                            })()}
                                        </tbody>
                                    </table>
                                    {subsection.dynamic && (
                                        <div className="mt-4">
                                            <button
                                                onClick={() => {
                                                    try {
                                                        const currentDynamicRows = report[subsection.storageField] ? JSON.parse(report[subsection.storageField]) : [];
                                                        const newDynamicRows = [...currentDynamicRows, { ...subsection.defaultDynamicRow }];
                                                        handleInputChange(subsection.storageField, JSON.stringify(newDynamicRows));
                                                    } catch (e) {
                                                        handleInputChange(subsection.storageField, JSON.stringify([{ ...subsection.defaultDynamicRow }]));
                                                    }
                                                }}
                                                className="flex items-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold px-4 py-2 rounded border border-gold/30 transition-smooth text-xs font-bold uppercase tracking-wider"
                                            >
                                                <Plus size={16} /> Add Other Reason
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const progressPercentage = ((currentStepIdx + 1) / WIZARD_STEPS.length) * 100;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-navy">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
            </div>
        );
    }

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    };

    return (
        <div className="min-h-screen bg-navy text-offwhite pb-20">
            {/* Header Sticky */}
            <div className="sticky top-20 lg:top-28 z-40 bg-navy/90 backdrop-blur-md border-b border-white/10 px-4 py-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/brsr/dashboard')}
                            className="p-2 hover:bg-white/10 rounded-full transition-smooth text-dimmed hover:text-gold"
                        >
                            <LayoutDashboard size={20} />
                        </button>
                        <div>
                            <h2 className="text-xl font-playfair text-gold">BRSR Master Report</h2>
                            <p className="text-xs text-dimmed">FY {report.financialYear} • {currentStep.label}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" size={16} />
                            <input
                                type="text"
                                placeholder="Search indicators..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm w-full outline-none focus:border-gold transition-smooth"
                            />
                        </div>
                        <button
                            onClick={() => saveReport(true)}
                            disabled={saving}
                            className="bg-gold text-navy px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-gold/80 disabled:opacity-50 transition-smooth"
                        >
                            {saving ? <div className="animate-spin h-4 w-4 border-2 border-navy border-t-transparent rounded-full" /> : <Save size={16} />}
                            Save
                        </button>
                    </div>
                </div>
            </div>

            {/* Stepper Progress */}
            <div className="container mx-auto px-4 mt-8">
                <div className="w-full bg-white/5 rounded-full h-1.5 mb-8 overflow-hidden">
                    <div
                        className="bg-gold h-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden sticky top-52">
                            <div className="p-4 bg-white/5 border-b border-white/10">
                                <h3 className="font-playfair text-gold flex items-center gap-2">
                                    <ListChecks size={18} /> Navigation
                                </h3>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto">
                                {HIERARCHY.map((section) => (
                                    <div key={section.id}>
                                        <button
                                            onClick={() => toggleSection(section.id)}
                                            className="w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-bold text-dimmed hover:text-gold flex justify-between items-center transition-smooth"
                                        >
                                            {section.title}
                                            <span className="text-[10px] opacity-50">{expandedSections[section.id] ? '−' : '+'}</span>
                                        </button>

                                        {expandedSections[section.id] && (
                                            <div className="bg-white/2">
                                                {section.steps.map((step) => (
                                                    <div key={step.id}>
                                                        {step.substeps ? (
                                                            <>
                                                                <button
                                                                    onClick={() => toggleSection(step.id)}
                                                                    className="w-full text-left px-6 py-2 text-sm text-dimmed hover:text-gold flex justify-between items-center transition-smooth"
                                                                >
                                                                    {step.label}
                                                                    <span className="text-[8px] opacity-30">{expandedSections[step.id] ? '▼' : '▶'}</span>
                                                                </button>
                                                                {expandedSections[step.id] && (
                                                                    <div className="bg-white/2 border-l border-white/5 ml-6">
                                                                        {step.substeps.map((sub) => {
                                                                            const subIdx = WIZARD_STEPS.findIndex(s => s.id === sub.id);
                                                                            return (
                                                                                <button
                                                                                    key={sub.id}
                                                                                    onClick={() => {
                                                                                        setCurrentStepIdx(subIdx);
                                                                                        window.scrollTo(0, 0);
                                                                                    }}
                                                                                    className={`w-full text-left px-6 py-2 text-xs transition-smooth border-l-2 ${currentStepIdx === subIdx
                                                                                        ? 'bg-gold/10 border-gold text-gold font-bold'
                                                                                        : 'border-transparent text-dimmed hover:bg-white/5'
                                                                                        }`}
                                                                                >
                                                                                    • {sub.label}
                                                                                </button>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => {
                                                                    const stepIdx = WIZARD_STEPS.findIndex(s => s.id === step.id);
                                                                    setCurrentStepIdx(stepIdx);
                                                                    window.scrollTo(0, 0);
                                                                }}
                                                                className={`w-full text-left px-6 py-2 text-sm transition-smooth border-l-2 ${currentStepIdx === WIZARD_STEPS.findIndex(s => s.id === step.id)
                                                                    ? 'bg-gold/10 border-gold text-gold font-bold'
                                                                    : 'border-transparent text-dimmed hover:bg-white/5'
                                                                    }`}
                                                            >
                                                                {step.label}
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:w-3/4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                            <div className="mb-8">
                                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-1">{currentSectionTitle}</p>
                                <h1 className="text-3xl font-playfair text-offwhite mb-2">{currentStep.label}</h1>
                                <p className="text-dimmed text-sm">Fill in the required details for this section. Your progress is saved automatically.</p>
                            </div>

                            <div className="space-y-8">
                                {BRSR_UI_METADATA[currentStep.key] ? (
                                    renderStructuredSection(BRSR_UI_METADATA[currentStep.key])
                                ) : currentFields.length > 0 ? (
                                    currentFields.map((field) => (
                                        <div key={field.name} className="group border-b border-white/5 pb-6 last:border-0">
                                            <div className="flex justify-between items-start mb-3">
                                                <label className="text-sm font-medium text-offwhite/80 group-focus-within:text-gold transition-smooth">
                                                    {field.label}
                                                </label>
                                                <div className="opacity-0 group-hover:opacity-100 transition-smooth">
                                                    <Info size={14} className="text-gold cursor-help" />
                                                </div>
                                            </div>
                                            <textarea
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-offwhite focus:border-gold outline-none transition-smooth min-h-[80px]"
                                                value={report[field.name] || ''}
                                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                placeholder={`Enter details for ${field.label}...`}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center">
                                        <p className="text-dimmed">No indicators found matching your search.</p>
                                    </div>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
                                <button
                                    onClick={() => {
                                        setCurrentStepIdx(prev => Math.max(0, prev - 1));
                                        window.scrollTo(0, 0);
                                    }}
                                    disabled={currentStepIdx === 0}
                                    className="flex items-center gap-2 text-dimmed hover:text-gold disabled:opacity-30 transition-smooth font-bold"
                                >
                                    <ChevronLeft size={20} /> Previous Section
                                </button>

                                {currentStepIdx === WIZARD_STEPS.length - 1 ? (
                                    <button
                                        onClick={() => {
                                            saveReport(true);
                                            toast({
                                                title: "Report Finalized",
                                                description: "Your report has been submitted for internal review.",
                                            });
                                            navigate('/brsr/dashboard');
                                        }}
                                        className="bg-green-500 text-navy px-8 py-3 rounded-lg font-bold hover:bg-green-400 transition-smooth shadow-lg shadow-green-500/20"
                                    >
                                        Finalize & Submit
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setCurrentStepIdx(prev => Math.min(WIZARD_STEPS.length - 1, prev + 1));
                                            window.scrollTo(0, 0);
                                        }}
                                        className="flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 px-6 py-3 rounded-lg font-bold hover:bg-gold/20 transition-smooth"
                                    >
                                        Next Section <ChevronRight size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TextEntryModal
                isOpen={textModal.open}
                onClose={() => setTextModal(prev => ({ ...prev, open: false }))}
                value={textModal.value}
                title={textModal.title}
                onSave={textModal.onSave}
            />

            <Dialog open={nicModal.open} onOpenChange={(open) => setNicModal(prev => ({ ...prev, open }))}>
                <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Select NIC Code</DialogTitle>
                    </DialogHeader>
                    <NICSelector
                        currentCode={nicModal.value}
                        onSelect={(code) => {
                            if (nicModal.onSave) nicModal.onSave(code);
                            setNicModal(prev => ({ ...prev, open: false }));
                        }}
                    />
                </DialogContent>
            </Dialog>


            {/* Row Edit Modal */}
            <Dialog open={rowEditModalOpen} onOpenChange={setRowEditModalOpen}>
                <DialogContent className="bg-navy border border-white/10 text-offwhite max-w-4xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-gold font-playfair text-xl">Edit Row Details</DialogTitle>
                        <DialogDescription className="text-dimmed">
                            {editingRowMeta.subsection && editingRowMeta.rowIndex !== -1 && (() => {
                                let rows = [];
                                try {
                                    const rawData = report[editingRowMeta.subsection.storageField];
                                    rows = rawData ? JSON.parse(rawData) : (editingRowMeta.subsection.defaultRows || []);
                                } catch (e) {
                                    rows = editingRowMeta.subsection.defaultRows || [];
                                }
                                if (!Array.isArray(rows)) rows = [];
                                const row = rows[editingRowMeta.rowIndex] || {};
                                return (row.category || row.label || "Row Details");
                            })()}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 p-1">
                        {editingRowMeta.subsection && editingRowMeta.rowIndex !== -1 && (() => {
                            const sub = editingRowMeta.subsection;
                            const idx = editingRowMeta.rowIndex;
                            let rows = [];
                            try {
                                const rawData = report[sub.storageField];
                                rows = rawData ? JSON.parse(rawData) : (sub.defaultRows || [sub.defaultRow]);
                            } catch (e) {
                                rows = sub.defaultRows || [sub.defaultRow];
                            }
                            if (!Array.isArray(rows)) rows = [];
                            const row = rows[idx] || {};

                            const cols = (sub.columns || []).filter(c => c.id !== 'sno');

                            return cols.map(col => (
                                <div key={col.id} className="space-y-1">
                                    <label className="text-xs text-dimmed uppercase tracking-wider">{col.label}</label>
                                    {renderDynamicField(sub, row, col, idx, false)}
                                </div>
                            ));
                        })()}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

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

export default BRSRReportWizard;
