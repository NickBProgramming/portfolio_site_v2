
export default function Projects() {
    return (
        <div className="container">
        <h2 className="text-3xl font-bold mt-10">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-xl font-bold">Project Name</h3>
            <p className="text-sm">Company Name</p>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nec ligula sit amet
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-xl font-bold">Project Name</h3>
            <p className="text-sm">Company Name</p>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nec ligula sit amet
            </p>
          </div>
        </div>
      </div>
    )
}