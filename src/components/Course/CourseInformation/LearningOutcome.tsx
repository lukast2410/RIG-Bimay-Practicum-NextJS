export default function LearningOutcome({learningOutcome}){
    return (
        <div className="bg-white shadow-md overflow-hidden sm:rounded-lg rounded-md">
            <div className="px-4 py-5 sm:px-6 bg-binus-blue">
                <h3 className="text-lg leading-6 font-medium text-white">
                    Learning Outcome
                </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    {
                        learningOutcome.map((data, idx) => (
                        <div key={idx} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                {`LO${idx + 1}`}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.Value}
                            </dd>
                        </div>
                        ))
                    }
                </dl>
            </div>
        </div>
    )
}