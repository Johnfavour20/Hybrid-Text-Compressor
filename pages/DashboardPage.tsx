
import React, { useState, useCallback, useContext, useMemo } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import { useToast } from '../components/Toast';
import { CompressionResult } from '../types';
import { formatFileSize } from '../utils/helpers';
import { AuthContext } from '../App';

const MOCK_HISTORY: CompressionResult[] = [
    {
        file_id: 1,
        filename: "project_report_final.txt",
        original_size: 1258291,
        compressed_size: 450123,
        compression_ratio: 2.79,
        compression_time: 0.234,
        upload_date: "2023-10-26 14:30"
    },
    {
        file_id: 2,
        filename: "research_data.txt",
        original_size: 5242880,
        compressed_size: 1897366,
        compression_ratio: 2.76,
        compression_time: 0.891,
        upload_date: "2023-10-25 09:15"
    }
];

const DashboardPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<CompressionResult | null>(null);
    const [history, setHistory] = useState<CompressionResult[]>(MOCK_HISTORY);
    const [isCompressing, setIsCompressing] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const { addToast } = useToast();

    const handleFileSelect = useCallback((selectedFile: File) => {
        const fileName = selectedFile.name.toLowerCase();
        if (!fileName.endsWith('.txt') && !fileName.endsWith('.docx')) {
            addToast('Please select a .txt or .docx file', 'error');
            return;
        }
        if (selectedFile.size > 16 * 1024 * 1024) { // 16MB limit
            addToast('File size must be less than 16MB', 'error');
            return;
        }
        setFile(selectedFile);
        setResult(null);
    }, [addToast]);
    
    const removeFile = useCallback(() => {
        setFile(null);
        setResult(null);
    }, []);

    const compressFile = useCallback(async () => {
        if (!file) {
            addToast('Please select a file first', 'error');
            return;
        }
        setIsCompressing(true);
        
        // Mock compression process
        await new Promise(res => setTimeout(res, 2000));

        const original_size = file.size;
        const compressed_size = Math.round(original_size * (Math.random() * 0.4 + 0.2));
        const newResult: CompressionResult = {
            file_id: Date.now(),
            filename: file.name,
            original_size,
            compressed_size,
            compression_ratio: parseFloat((original_size / compressed_size).toFixed(2)),
            compression_time: parseFloat((Math.random() * 2 + 0.1).toFixed(3)),
            upload_date: new Date().toISOString().slice(0, 16).replace('T', ' ')
        };
        
        setResult(newResult);
        setHistory(prev => [newResult, ...prev]);
        addToast('File compressed successfully!', 'success');
        setIsCompressing(false);
    }, [file, addToast]);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };
    
    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 mb-8 text-center shadow-lg">
                    <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {auth?.user?.username}!</h1>
                    <p className="mt-2 text-blue-200 text-lg">Compress your text files using our advanced hybrid algorithm.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                       <UploadSection 
                           file={file} 
                           isDragOver={isDragOver} 
                           isCompressing={isCompressing} 
                           onFileSelect={handleFileSelect} 
                           onRemoveFile={removeFile} 
                           onCompressFile={compressFile}
                           onDragOver={handleDragOver}
                           onDragLeave={handleDragLeave}
                           onDrop={handleDrop}
                       />
                       {result && <ResultsSection result={result} onReset={removeFile}/>}
                    </div>
                    <div className="lg:col-span-1">
                        <HistorySection history={history} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

// --- Sub-components for DashboardPage ---

interface UploadSectionProps {
    file: File | null;
    isDragOver: boolean;
    isCompressing: boolean;
    onFileSelect: (file: File) => void;
    onRemoveFile: () => void;
    onCompressFile: () => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ file, isDragOver, isCompressing, onFileSelect, onRemoveFile, onCompressFile, ...dragProps }) => {
    const inputId = useMemo(() => `file-input-${Math.random()}`, []);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            {!file ? (
                <div
                    {...dragProps}
                    className={`text-center p-8 border-2 border-dashed rounded-xl transition-all duration-300 ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'}`}
                >
                    <Icon name="cloud-upload" className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-800">Upload Text File</h3>
                    <p className="text-slate-500 mt-2 mb-6">Drag and drop your .txt file here or click to browse</p>
                    <input type="file" id={inputId} accept=".txt,.docx" hidden onChange={(e) => e.target.files && onFileSelect(e.target.files[0])} />
                    <button onClick={() => document.getElementById(inputId)?.click()} className="bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto">
                        <Icon name="file" className="w-5 h-5"/>
                        Select File
                    </button>
                </div>
            ) : (
                <div className="p-2 sm:p-4">
                    <div className="flex items-center gap-4 bg-slate-100 p-4 rounded-lg mb-6">
                        <Icon name="file" className="w-10 h-10 text-blue-500 flex-shrink-0" />
                        <div className="flex-grow overflow-hidden">
                            <p className="font-semibold text-slate-800 truncate">{file.name}</p>
                            <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                        </div>
                        <button onClick={onRemoveFile} className="p-2 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-500 transition-colors">
                            <Icon name="times" className="w-6 h-6" />
                        </button>
                    </div>
                    <button onClick={onCompressFile} disabled={isCompressing} className="w-full bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-3 disabled:bg-emerald-300 disabled:cursor-not-allowed">
                        {isCompressing && <Icon name="spinner" className="w-6 h-6" />}
                        <Icon name="compress-arrows" className="w-6 h-6" />
                        <span>{isCompressing ? 'Compressing...' : 'Compress File'}</span>
                    </button>
                </div>
            )}
        </div>
    );
};

const ResultsSection: React.FC<{ result: CompressionResult, onReset: () => void }> = ({ result, onReset }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
        <h3 className="text-2xl font-bold text-emerald-600 flex items-center gap-3 mb-6">
            <Icon name="chart-bar" className="w-8 h-8"/>
            Compression Results
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <ResultItem icon="file" label="Original Size" value={formatFileSize(result.original_size)} />
            <ResultItem icon="compress" label="Compressed Size" value={formatFileSize(result.compressed_size)} />
            <ResultItem icon="percentage" label="Compression Ratio" value={`${result.compression_ratio}:1`} />
            <ResultItem icon="clock" label="Processing Time" value={`${result.compression_time}s`} />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-500 text-white font-semibold py-3 px-5 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <Icon name="download" className="w-5 h-5"/> Download Compressed File
            </button>
            <button onClick={onReset} className="flex-1 bg-slate-200 text-slate-800 font-semibold py-3 px-5 rounded-lg hover:bg-slate-300 transition-colors flex items-center justify-center gap-2">
                <Icon name="plus" className="w-5 h-5"/> Compress Another File
            </button>
        </div>
    </div>
);

const ResultItem: React.FC<{icon: any, label: string, value: string}> = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name={icon} className="w-6 h-6"/>
        </div>
        <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const HistorySection: React.FC<{ history: CompressionResult[] }> = ({ history }) => (
    <div className="bg-white rounded-2xl shadow-lg h-full">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <Icon name="history" className="w-8 h-8"/>
                History
            </h3>
            <button className="text-slate-500 hover:text-blue-500 p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Icon name="sync" className="w-5 h-5"/>
            </button>
        </div>
        <div className="p-2 sm:p-6 space-y-4 max-h-[calc(100vh-250px)] lg:max-h-[600px] overflow-y-auto">
            {history.length > 0 ? (
                history.map(item => <HistoryItem key={item.file_id} item={item} />)
            ) : (
                <div className="text-center py-12 text-slate-500">
                    <Icon name="inbox" className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                    <p className="font-medium">No compression history yet.</p>
                    <p className="text-sm">Upload a file to get started!</p>
                </div>
            )}
        </div>
    </div>
);

const HistoryItem: React.FC<{ item: CompressionResult }> = ({ item }) => (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
        <div className="flex justify-between items-start">
            <div className="overflow-hidden">
                <p className="font-semibold text-slate-800 truncate flex items-center gap-2">
                    <Icon name="file" className="w-5 h-5 text-blue-500 flex-shrink-0"/>
                    {item.filename}
                </p>
                <p className="text-xs text-slate-400 mt-1">{item.upload_date}</p>
            </div>
            <button className="text-slate-500 hover:text-blue-500 p-2 rounded-full hover:bg-slate-200 transition-colors flex-shrink-0 ml-2">
                <Icon name="download" className="w-5 h-5"/>
            </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-4 mt-4 text-center text-xs">
            <div>
                <p className="text-slate-500">Original Size</p>
                <p className="font-medium text-slate-700">{formatFileSize(item.original_size)}</p>
            </div>
             <div>
                <p className="text-slate-500">Compressed Size</p>
                <p className="font-medium text-slate-700">{formatFileSize(item.compressed_size)}</p>
            </div>
            <div className="sm:col-start-auto col-start-1">
                <p className="text-slate-500">Ratio</p>
                <p className="font-medium text-slate-700">{item.compression_ratio}:1</p>
            </div>
            <div className="sm:col-start-auto col-start-2">
                <p className="text-slate-500">Time</p>
                <p className="font-medium text-slate-700">{item.compression_time}s</p>
            </div>
        </div>
    </div>
);

export default DashboardPage;
