import { motion } from 'framer-motion';


export default function ServiceDetailModal({ service, onClose }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
            >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <div className="text-4xl mr-4 opacity-80">{service.icon}</div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{service.title}</h2>
                        <button 
                            onClick={onClose} 
                            className="ml-auto text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{service.fullDescription}</p>
                        
                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl">
                            <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Key Services</h3>
                            {/* Added max-h-80 for scrollability and overflow-y-auto */}
                            <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
                                {service.details.map((detail, index) => (
                                    <li key={index} className="bg-white dark:bg-gray-600 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{detail.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{detail.explanation}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Our Process</h3>
                        <div className="relative before:absolute before:left-[18px] before:h-full before:w-0.5 before:bg-indigo-200 dark:before:bg-indigo-800">
                            <ol className="space-y-6 relative">
                                {service.processSteps.map((step, index) => (
                                    <li key={index} className="relative pl-12">
                                        <div className="absolute left-0 w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
                                            <span className="font-bold">{index + 1}</span>
                                        </div>
                                        <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <p className="text-gray-900 dark:text-white">{step}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}