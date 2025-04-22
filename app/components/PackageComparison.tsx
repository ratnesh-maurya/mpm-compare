'use client';

import { useState } from 'react';
import { PackageData } from '../types';
import SizeComparison from './comparison/SizeComparison';
import VersionComparison from './comparison/VersionComparison';
import DownloadsComparison from './comparison/DownloadsComparison';

interface PackageComparisonProps {
    packages: PackageData[];
}

export default function PackageComparison({ packages }: PackageComparisonProps) {
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        size: true,
        version: true,
        downloads: true,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="mt-8 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Package Comparison</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {packages.map((pkg) => (
                        <div key={pkg.name} className="group bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{pkg.name}</h3>
                                    <span className="text-sm text-gray-500">{pkg.author || 'Unknown'}</span>
                                </div>
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium group-hover:bg-blue-100 transition-colors duration-200 self-start">
                                    v{pkg.version}
                                </span>
                            </div>

                            <p className="mt-3 text-sm sm:text-base text-gray-600 line-clamp-2">{pkg.description}</p>

                            <div className="mt-4 space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm">{pkg.license || 'No license'}</span>
                                    </div>
                                    {pkg.downloads && (
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            <span className="text-sm font-medium">{pkg.downloads.weekly?.toLocaleString() || 0}/week</span>
                                        </div>
                                    )}
                                </div>

                                {pkg.repository && (
                                    <a
                                        href={`${pkg.repository}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 group/repo text-sm"
                                    >
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover/repo:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="truncate hover:underline">View on GitHub</span>
                                    </a>
                                )}

                                {pkg.keywords && pkg.keywords.length > 0 && (
                                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                                        {pkg.keywords.slice(0, 5).map((keyword) => (
                                            <span key={keyword} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs hover:bg-gray-100 transition-colors duration-200">
                                                {keyword}
                                            </span>
                                        ))}
                                        {pkg.keywords.length > 5 && (
                                            <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-full text-xs">
                                                +{pkg.keywords.length - 5}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-500">Created</span>
                                        <p className="text-sm font-medium text-gray-900">{new Date(pkg.time.created).toLocaleDateString()}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-500">Last Updated</span>
                                        <p className="text-sm font-medium text-gray-900">{new Date(pkg.time.modified).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                            className="w-full p-4 sm:p-5 text-left font-bold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => toggleSection('size')}
                        >
                            <div className="flex items-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span className="text-sm sm:text-base">Package Size Analysis</span>
                            </div>
                            <span className="text-gray-500">{expandedSections.size ? '▼' : '▶'}</span>
                        </button>
                        {expandedSections.size && (
                            <div className="p-4 sm:p-6 border-t border-gray-200">
                                <SizeComparison packages={packages} />
                            </div>
                        )}
                    </div>

                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                            className="w-full p-5 text-left font-bold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => toggleSection('version')}
                        >
                            <div className="flex items-center">
                                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Version & Dependency Insights</span>
                            </div>
                            <span className="text-gray-500">{expandedSections.version ? '▼' : '▶'}</span>
                        </button>
                        {expandedSections.version && (
                            <div className="p-6 border-t border-gray-200">
                                <VersionComparison packages={packages} />
                            </div>
                        )}
                    </div>

                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                            className="w-full p-5 text-left font-bold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => toggleSection('downloads')}
                        >
                            <div className="flex items-center">
                                <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span>Download Trends</span>
                            </div>
                            <span className="text-gray-500">{expandedSections.downloads ? '▼' : '▶'}</span>
                        </button>
                        {expandedSections.downloads && (
                            <div className="p-6 border-t border-gray-200">
                                <DownloadsComparison packages={packages} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 