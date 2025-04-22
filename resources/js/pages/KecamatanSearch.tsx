import React, { useState, useEffect, useCallback } from 'react';  
import axios from 'axios';  
import { Kecamatan } from '@/types';  
import { Head } from '@inertiajs/react';  
  
 
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {  
    let timeoutId: ReturnType<typeof setTimeout> | null = null;  
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>  
        new Promise((resolve) => {  
            if (timeoutId) { clearTimeout(timeoutId); }  
            timeoutId = setTimeout(() => { resolve(func(...args)); }, waitFor);  
        });  
}  
  
export default function KecamatanSearch() {  
    const [searchQuery, setSearchQuery] = useState('');  
    const [results, setResults] = useState<Kecamatan[]>([]);  
    const [selectedKecamatan, setSelectedKecamatan] = useState<Kecamatan | null>(null);  
    const [isLoading, setIsLoading] = useState(false);  
    const [showDropdown, setShowDropdown] = useState(false);  
   
    const fetchKecamatans = useCallback(  
        debounce(async (query: string) => {  
            if (query.trim() === '') {  
                setResults([]);  
                setShowDropdown(false);  
                setIsLoading(false);  
                return;  
            }  
            setIsLoading(true);  
            try {  
                const response = await axios.get<Kecamatan[]>('/api/locations', {  
                    params: { search: query },  
                });  
                setResults(response.data);  
                setShowDropdown(response.data.length > 0); 
            } catch (error) {  
                console.error('Error fetching kecamatan data:', error);  
                setResults([]);  
                setShowDropdown(false);  
            } finally {  
                setIsLoading(false);  
            }  
        }, 300),  
        []  
    );  
  
 
    useEffect(() => {  
        fetchKecamatans(searchQuery);  
    }, [searchQuery, fetchKecamatans]);  
  
 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        const query = event.target.value;  
        setSearchQuery(query);  
        setSelectedKecamatan(null);  
        if (!query.trim()) {  
            setShowDropdown(false);  
        } else {  
            fetchKecamatans(query);  
        }  
    };  
  
    const handleSelectKecamatan = (kecamatan: Kecamatan) => {  
        setSelectedKecamatan(kecamatan);  
        setSearchQuery(`${kecamatan.kecamatan}, ${kecamatan.kota}`);  
        setResults([]);  
        setShowDropdown(false);  
    };  
  
 
    useEffect(() => {  
        const handleClickOutside = (event: MouseEvent) => {   
            const container = document.getElementById('search-container');  
            if (container && !container.contains(event.target as Node)) {  
                setShowDropdown(false);  
            }  
        };  
  
        if (showDropdown) {  
            document.addEventListener('mousedown', handleClickOutside);  
        } else {  
 
            document.removeEventListener('mousedown', handleClickOutside);  
        }  
  
        return () => {  
            document.removeEventListener('mousedown', handleClickOutside);  
        };  
    }, [showDropdown]); 
  
    return (  
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">  
            <Head title="Kecamatan Search" />  
  
            <header className="bg-white dark:bg-gray-800 shadow">  
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">  
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">  
                        Kecamatan Search  
                    </h2>  
                </div>  
            </header>  
  
            <main>  
                <div className="py-12">  
                    <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">  
                         
                        <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">  
                            <div className="p-6 text-gray-900 dark:text-gray-100">  
                                
                                <div id="search-container" className="relative mb-4">  
                                    <label htmlFor="search-kecamatan" className="block text-sm font-medium mb-1">  
                                        Search Kecamatan, Kota, atau Provinsi  
                                    </label>  
                                    <input  
                                        type="text"  
                                        id="search-kecamatan"  
                                        value={searchQuery}  
                                        onChange={handleInputChange}  
                                        onFocus={() => searchQuery.trim() && results.length > 0 && setShowDropdown(true)}  
                                        placeholder="contoh: Menteng, Jakarta Pusat, DKI Jakarta"  
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"  
                                        autoComplete="off"  
                                    />  
                                    {isLoading && <div className="absolute right-3 top-9 text-sm text-gray-500">Loading...</div>}  
  
                                    {showDropdown && results.length > 0 && (  
                                        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">  
                                            {results.map((kec) => (  
                                                <li  
                                                    key={kec.id}  
                                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"  
                                                    onMouseDown={() => handleSelectKecamatan(kec)} // Use onMouseDown  
                                                >  
                                                    {kec.kecamatan}, {kec.kota}, {kec.provinsi}  
                                                </li>  
                                            ))}  
                                        </ul>  
                                    )}  
                                    {showDropdown && results.length === 0 && searchQuery.trim() && !isLoading && (  
                                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg p-4 text-center text-gray-500">  
                                            No results found.  
                                        </div>  
                                    )}  
                                </div>  
  
                                {selectedKecamatan && (  
                                    <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900">  
                                        <h3 className="text-lg font-semibold mb-2">Selected Location Details:</h3>  
                                        <p><strong>ID:</strong> {selectedKecamatan.id}</p>  
                                        <p><strong>Kecamatan:</strong> {selectedKecamatan.kecamatan}</p>  
                                        <p><strong>Kota/Kabupaten:</strong> {selectedKecamatan.kota}</p>  
                                        <p><strong>Provinsi:</strong> {selectedKecamatan.provinsi}</p>  
                                    </div>  
                                )}  
                            </div>  
                        </div>  
                    </div>  
                </div>  
            </main>  
        </div>
    );  
}  
