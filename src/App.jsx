import React, { useState } from 'react';

// --- Reusable Icon Components ---
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const SparklesIcon = ( ) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 4-2.293-2.293a1 1 0 010-1.414L9 7l4-4zm6 16l2.293 2.293a1 1 0 001.414 0L21 15l-4-4-2.293 2.293a1 1 0 000 1.414L19 17l-4 4z" /></svg>;
const MailIcon = ( ) => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const TranslateIcon = ( ) => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m4 1h6m-6 2h6m-6 2h6M9 21v-2m4-2h6m-6 2h6m-6 2h6M5 3v18" /></svg>;
const TrashIcon = ( ) => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const CheckIcon = ( ) => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const SpinnerIcon = ( ) => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

// --- Main App Component ---
const MeetingCompanionUI = ( ) => {
  // This state is just for toggling the display of the output sections for the UI preview.
  const [isProcessed, setIsProcessed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Summary, setSummary] = useState([]);

    const loadDetector =  async() =>{
      if (navigator.userActivation.isActive) {
        const detector = await LanguageDetector.create();
      //  const someUserText = 'Hallo und herzlich willkommen!';
       const results = await detector.detect("hello how are you");
       for (const result of results) {
         // Show the full list of potential languages with their likelihood, ranked
         // from most likely to least likely. In practice, one would pick the top
         // language(s) that cross a high enough threshold.
         setSummary(results);
         console.log(result.detectedLanguage, result.confidence.toFixed(2)*100, '%');
       }
    }
  }
  const handleProcess = () => {
    setIsLoading(true);
    setIsProcessed(false);
    setTimeout(() => {
      setIsLoading(false);
      setIsProcessed(true);
    }, 1500);
    loadDetector();
  };

  const dummyTasks = [
    { id: 1, text: "Draft Q4 budget proposal", assignee: "Liam", completed: false },
    { id: 2, text: "Research new social media ad platforms", assignee: "Olivia", completed: true },
    { id: 3, text: "Schedule content brainstorming session", assignee: "Noah", completed: false },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 font-sans text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* --- Header --- */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Intelligent Meeting Companion</h1>
            <p className="text-blue-300 mt-1">Transform your notes into actionable outcomes.</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-md">
              <MailIcon /> <span className="hidden sm:inline">Follow-up Email</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-md">
              <TranslateIcon /> <span className="hidden sm:inline">Translate</span>
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* --- Left Column: Input & Output --- */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* --- Input Card --- */}
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><span className="bg-blue-500/20 text-blue-300 text-sm font-bold px-3 py-1 rounded-full">1</span> Paste or Upload Transcript</h2>
              <textarea
                placeholder="Paste your meeting transcript here..."
                className="w-full min-h-[180px] bg-gray-800/50 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
              ></textarea>
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
                
                <button
                  onClick={handleProcess}
                  disabled={isLoading}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-3 bg-blue-600 rounded-lg font-bold text-lg hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? <SpinnerIcon /> : <SparklesIcon />}
                  <span>{isLoading ? 'Processing...' : 'Generate'}</span>
                </button>
              </div>
            </div>

            {/* --- Output Section (Conditional) --- */}
            {isProcessed && (
              <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-6 backdrop-blur-xl space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3"><span className="bg-green-500/20 text-green-300 text-sm font-bold px-3 py-1 rounded-full">2</span> Generated Insights</h2>
                {/* Summary */}
                <div>
                  <h3 className="font-semibold text-lg text-blue-300 mb-2">Summary</h3>
                  <p className="text-gray-300 leading-relaxed">The team discussed the Q4 marketing strategy, focusing on digital campaigns and social media engagement. A follow-up meeting is scheduled to finalize campaign specifics.</p>
                </div>
                {/* Action Items */}
                <div>
                  <h3 className="font-semibold text-lg text-green-300 mb-2">Action Items</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>Liam to draft the initial budget proposal by end of week.</li>
                    <li>Olivia to research new social media advertising platforms.</li>
                  </ul>
                </div>
                {/* Grammar Correction */}
                <div>
                  <h3 className="font-semibold text-lg text-purple-300 mb-2">Grammar Correction</h3>
                  <p className="text-gray-400 italic border-l-2 border-purple-400 pl-3">"Our team's strategic approach <span className="text-purple-300 not-italic font-medium">should prioritize</span> innovation, ensuring all project deliverables are met..."</p>
                </div>
              </div>
            )}
          </div>

          {/* --- Right Column: Auto-Action Board --- */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><span className="bg-yellow-500/20 text-yellow-300 text-sm font-bold px-3 py-1 rounded-full">3</span> Auto-Action Board</h2>
            <div className="space-y-3">
              {dummyTasks.map(task => (
                <div key={task.id} className={`flex items-center p-3 rounded-lg transition-all duration-300 ${task.completed ? 'bg-green-500/10' : 'bg-white/5 hover:bg-white/10'}`}>
                  <button className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center border-2 transition-all duration-300 ${task.completed ? 'bg-green-500 border-green-400' : 'border-gray-400 hover:border-green-400'}`}>
                    {task.completed && <CheckIcon />}
                  </button>
                  <div className="ml-3 flex-grow">
                    <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>{task.text}</p>
                  </div>
                  <div className="ml-3 flex items-center gap-2">
                    <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">{task.assignee}</span>
                    <button className="text-gray-500 hover:text-red-400 transition-colors duration-300"><TrashIcon /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default MeetingCompanionUI;
