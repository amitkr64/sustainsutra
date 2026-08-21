import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet, Download, Check, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Bulk import for the CCTS monitoring form. Reads an .xlsx/.csv file and maps
 * rows into raw-materials or fuel entries matching the MonitoringDataForm's
 * internal shape, then calls onImport(rows, kind) so the parent can merge them.
 *
 * The form uses `material`/`fuelType` keys and `tonne` units (its own internal
 * shape); the form→backend field reconciliation (material↔name, tonne↔tonnes)
 * happens later on save, so this importer matches the FORM's shape.
 */
const MonitoringBulkImport = ({ onImport }) => {
    const [open, setOpen] = useState(false);
    const [kind, setKind] = useState('rawMaterials'); // or 'fuelInputs'
    const [rows, setRows] = useState([]);
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');
    const fileRef = useRef(null);

    const TEMPLATES = {
        rawMaterials: [
            ['material', 'quantity', 'unit', 'emissionFactor', 'emissionFactorSource', 'scope'],
            ['Limestone', 1000, 'tonne', 0.44, 'IPCC', 'Scope 3'],
            ['Iron Ore', 500, 'tonne', 0.04, 'Supplier', 'Scope 3']
        ],
        fuelInputs: [
            ['fuelType', 'quantity', 'unit', 'ncv', 'emissionFactor', 'emissionFactorSource', 'scope'],
            ['Coal', 200, 'tonne', 25, 1.9, 'IPCC', 'Scope 1'],
            ['Diesel', 50, 'litre', 0.035, 2.6, 'IPCC', 'Scope 1']
        ]
    };

    const EXPECTED_KEYS = {
        rawMaterials: ['material', 'quantity', 'unit', 'emissionFactor', 'emissionFactorSource', 'scope'],
        fuelInputs: ['fuelType', 'quantity', 'unit', 'ncv', 'emissionFactor', 'emissionFactorSource', 'scope']
    };

    const DEFAULT_ROW = {
        rawMaterials: () => ({ material: '', quantity: 0, unit: 'tonne', emissionFactor: 0, emissionFactorSource: '', scope: 'Scope 3' }),
        fuelInputs: () => ({ fuelType: '', quantity: 0, unit: 'tonne', ncv: 0, emissionFactor: 0, emissionFactorSource: '', scope: 'Scope 1' })
    };

    const downloadTemplate = () => {
        const ws = XLSX.utils.aoa_to_sheet(TEMPLATES[kind]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, kind);
        XLSX.writeFile(wb, `SustainSutra_${kind}_template.xlsx`);
    };

    const normalizeKey = (k) => k.toString().trim().toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setError('');
        setRows([]);
        setFileName(file.name);
        try {
            const buf = await file.arrayBuffer();
            const wb = XLSX.read(buf, { type: 'array' });
            const sheet = wb.Sheets[wb.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
            if (!json.length) {
                setError('The file has no data rows.');
                return;
            }

            // Map header columns (case/whitespace-insensitive) to our keys.
            const expected = EXPECTED_KEYS[kind];
            const sample = json[0];
            const headerMap = {};
            Object.keys(sample).forEach((h) => {
                const norm = normalizeKey(h);
                const match = expected.find(k => norm === k || norm.includes(k));
                if (match) headerMap[h] = match;
            });

            if (!headerMap[Object.keys(headerMap)[0]]) {
                setError(`Could not find expected columns. Expected: ${expected.join(', ')}. Found: ${Object.keys(sample).join(', ')}`);
                return;
            }

            const parsed = json.map((row) => {
                const base = DEFAULT_ROW[kind]();
                Object.entries(headerMap).forEach(([sourceKey, targetKey]) => {
                    let v = row[sourceKey];
                    if (['quantity', 'ncv', 'emissionFactor'].includes(targetKey)) {
                        v = parseFloat(v);
                        if (isNaN(v)) v = 0;
                    }
                    if (v !== '' && v !== undefined) base[targetKey] = v;
                });
                return base;
            }).filter(r => {
                // drop fully-empty rows
                const isRaw = kind === 'rawMaterials';
                const label = isRaw ? r.material : r.fuelType;
                return label || r.quantity;
            });

            setRows(parsed);
        } catch (err) {
            setError('Failed to read the file. Ensure it is a valid .xlsx or .csv.');
        }
    };

    const commit = () => {
        onImport(rows, kind);
        reset();
    };

    const reset = () => {
        setRows([]);
        setError('');
        setFileName('');
        setOpen(false);
        if (fileRef.current) fileRef.current.value = '';
    };

    if (!open) {
        return (
            <Button variant="outline" onClick={() => setOpen(true)} className="border-gold/30 text-gold hover:bg-gold/10">
                <Upload size={16} className="mr-2" /> Bulk Import
            </Button>
        );
    }

    return (
        <div className="bg-white/5 border border-gold/30 rounded-xl p-6 mt-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FileSpreadsheet className="text-gold" size={20} />
                    <h4 className="text-lg font-playfair text-white">Bulk Import</h4>
                </div>
                <button onClick={reset} className="text-dimmed hover:text-white" aria-label="Close bulk import">
                    <X size={20} />
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
                <label htmlFor="import-target" className="text-sm text-dimmed">Import to:</label>
                <select
                    id="import-target"
                    value={kind}
                    onChange={(e) => { setKind(e.target.value); setRows([]); setError(''); }}
                    className="bg-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-offwhite focus:border-gold outline-none"
                >
                    <option value="rawMaterials">Raw Materials (Scope 3)</option>
                    <option value="fuelInputs">Fuels (Scope 1)</option>
                </select>
                <Button variant="ghost" onClick={downloadTemplate} className="text-sm">
                    <Download size={14} className="mr-1" /> Download template
                </Button>
            </div>

            <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFile}
                className="block w-full text-sm text-dimmed file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-offwhite file:bg-gold/20 hover:file:bg-gold/30 file:cursor-pointer"
            />
            {fileName && <p className="text-xs text-dimmed mt-2">Loaded: {fileName}</p>}

            {error && (
                <div className="flex items-start gap-2 mt-4 bg-red-500/10 border border-red-500/30 text-red-200 p-3 rounded-lg text-sm">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            {rows.length > 0 && (
                <>
                    <p className="text-sm text-offwhite mt-4">
                        <Check size={16} className="inline mr-1 text-green-400" />
                        {rows.length} rows ready to import into {kind === 'rawMaterials' ? 'raw materials' : 'fuels'}.
                    </p>
                    <div className="overflow-x-auto mt-3 max-h-48 border border-white/10 rounded-lg">
                        <table className="w-full text-xs">
                            <thead className="bg-white/5 sticky top-0">
                                <tr>
                                    {EXPECTED_KEYS[kind].map(k => (
                                        <th key={k} className="px-3 py-2 text-left text-dimmed uppercase">{k}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {rows.slice(0, 8).map((r, i) => (
                                    <tr key={i}>
                                        {EXPECTED_KEYS[kind].map(k => (
                                            <td key={k} className="px-3 py-2 text-offwhite">{String(r[k])}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {rows.length > 8 && <p className="text-center text-dimmed text-xs py-2">...and {rows.length - 8} more</p>}
                    </div>
                    <div className="flex gap-3 mt-4">
                        <Button onClick={commit} className="bg-gold text-navy">
                            <Check size={16} className="mr-1" /> Add {rows.length} rows
                        </Button>
                        <Button variant="ghost" onClick={reset}>Cancel</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MonitoringBulkImport;
