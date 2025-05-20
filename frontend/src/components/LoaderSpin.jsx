
const LoaderSpin = ({ text = "Loading", message = "Please wait..." }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col gap-4 items-center justify-center z-50 text-white">
            <div className="w-12 h-12 border-4 border-white border-t-[#FF9933] border-b-[#138808] rounded-full animate-spin"></div>

            <div className="flex gap-1 text-lg font-semibold">
                <span>{text}</span>
                <span className="animate-pulse">.</span>
                <span className="animate-pulse animation-delay-200">.</span>
                <span className="animate-pulse animation-delay-400">.</span>
                <span className="animate-pulse animation-delay-600">.</span>
            </div>
            <p className="text-sm text-gray-200">{message}</p>
        </div>
    )
}

export default LoaderSpin;