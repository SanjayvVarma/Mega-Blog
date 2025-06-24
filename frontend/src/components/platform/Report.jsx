import { useState } from 'react';
import LoaderSpin from '../LoaderSpin';
import useReports from '../../hooks/useReports';
import formatCount from '../../utils/formatCount';

const Report = () => {
  const { isLoading, reports } = useReports();
  const [activeReportId, setActiveReportId] = useState(null);

  const openModal = (id) => setActiveReportId(id);
  const closeModal = () => setActiveReportId(null);

  return (
    <div className="p-1">

      {isLoading && (
        <LoaderSpin text="Fetching Blog Reports" message="Please wait while we load blog report details." />
      )}

      {reports.length > 0 && (
        <div className="sticky top-0 z-10 py-2 text-center border-b border-gray-600">
          <p className="text-lg sm:text-base font-bold text-white">
            Total Reported Blogs: <span className="font-bold text-green-400">{formatCount(reports.length)}</span>
          </p>
        </div>
      )}

      <div className="md:max-h-[calc(100vh-150px)] max-h-[calc(100vh-220px)] overflow-y-auto pr-1 pt-2 scrollbar-hide">

        {reports && reports.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {reports.map((report) => (
              <div
                key={report.blogId}
                className="relative group bg-gradient-to-br from-[#252555] via-[#252548] to-[#171731] border border-gray-700 rounded-2xl p-6 text-white flex flex-col justify-between transition duration-300 hover:shadow-xl"
              >
                <div className="absolute -inset-[1px] rounded-2xl border border-transparent group-hover:border-indigo-500 transition-all duration-300 pointer-events-none blur-[1px]" />

                <div className="mb-2">
                  <h3 className="text-lg font-semibold mb-2 text-[#94f5e2] line-clamp-3">{report.title}</h3>
                  {report.mainImage && (
                    <img
                      src={report.mainImage}
                      alt="Blog"
                      className="w-full h-40 object-cover rounded-md border border-gray-800"
                    />
                  )}
                </div>

                <div className="flex justify-between items-start text-sm text-gray-300 mb-3">
                  <div>
                    👤 {report.author?.fullName}
                    <br />
                    📧 {report.author?.email}
                  </div>
                  <button
                    onClick={() => openModal(report.blogId)}
                    className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md flex items-center gap-1 shadow transition"
                  >
                    🧾 {report.totalReports} Report{report.totalReports > 1 ? 's' : ''}
                  </button>
                </div>

                <div className="border-b border-gray-500 my-2" />

                {activeReportId === report.blogId && (
                  <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-2">
                    <div className="relative bg-[#1a1a2e] p-6 rounded-xl w-full max-w-2xl shadow-lg border border-gray-700 h-[90%] overflow-y-auto">
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-red-400 z-10"
                      >
                        &times;
                      </button>

                      <h3 className="text-xl font-bold text-white mb-4 text-center">🚫 Reason Breakdown</h3>

                      <div className="space-y-4 max-h-[500px] bg-[#111827] overflow-y-auto rounded-lg scrollbar-hide border border-gray-700 p-4">
                        {Object.entries(report.reasonsBreakdown).map(([reason, count]) => (
                          <div
                            key={reason}
                            className="flex justify-between border-b border-gray-700 pb-2"
                          >
                            <span className="capitalize text-gray-300">{reason}</span>
                            <span className="font-bold text-white">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center text-lg mt-8">No reports found.</p>
        )}
      </div>
    </div>
  );
};

export default Report;