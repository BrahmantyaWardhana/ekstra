
<div className="p-3 bg-gray-700 rounded-lg mb-2">
  <div className="flex justify-between items-start">
    <div>
      <p className="font-medium text-gray-100">{file.name}</p>
      <p className="text-xs text-gray-400">
        {file.size} • {file.type}
      </p>
    </div>
    <button
      type='button'
      onClick={() => handleRemoveFile(file.key)}
      className="text-red-400 hover:text-red-300 text-sm"
    >
      Remove
    </button>
  </div>
</div>
