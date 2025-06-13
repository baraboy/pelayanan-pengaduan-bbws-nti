import { useEffect, useState } from "react";
import axios from "../libs/axios";

export default function UploadFile({ onChange }: { onChange: Function }) {

    const [files, setFiles] = useState<any>([])

    useEffect(() => {
        console.log('files', files)
        onChange(files)
    }, [files])

    const handleOnUpload = async (data: any) => {
        try {
            const fData = new FormData();
            fData.append("file", data[0], data[0].name);
            const res = await axios.post("/api/upload", fData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Basic c3VydmV5c2lzZGE6cGFzczJzaXNkYXN1cnZleQ=='
                },
            });
            console.log("upload", res);
            let f = [...files, res.data.data]
            setFiles(f)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDragOver = (event: any) => {
        event.preventDefault();
        if (!event.currentTarget.classList.contains('bg-blue-300')) {
            event.currentTarget.classList.remove('bg-gray-100');
            event.currentTarget.classList.add('bg-blue-300');
        }
    };

    const handleDragLeave = (event: any) => {
        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('bg-blue-300');
    };

    const handleDrop = (event: any) => {
        event.preventDefault();

        // let files = [...event.dataTransfer.files];
        // uploadInputRef.current.files = event.dataTransfer.files;
        // console.log(uploadInputRef.current.files);
        // uploadInputRef.current.onchange();
        // console.log('file', files);
        // let ev = new Event('input', { bubbles: true });
        // uploadInputRef.current.dispatchEvent(ev);

        // console.log('on change', event.target.files || event.dataTransfer.files);

        let files = event.target.files || event.dataTransfer.files;
        handleOnUpload(files);

        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('bg-blue-300');
    };

    const deleteFile = (index: number) => {
        let f = [...files]
        if (index > -1) { // only splice array when item is found
            f.splice(index, 1); // 2nd parameter means remove one item only
        }
        setFiles(f)
    }

    return (
        <div>
            {/* <input
                type="file"
                name="bukti_dukung"
                id="bukti_dukung"
                className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => {
                    handleOnUpload(e.target.files)
                }}
            /> */}

            <div
                className="w-full"
                onDragOver={(e) => handleDragOver(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e)}>
                <label htmlFor={"bukti_dukung"} className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-3 pb-4">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop file</p>
                        {/* <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                    </div>
                    <input id={"bukti_dukung"} type="file" className="hidden" onChange={(e) => {
                        console.log('e photo', e.target?.files)
                        handleOnUpload(e.target.files)
                    }} />
                </label>
            </div>

            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200 mt-2">
                {files.map((d: any, i: number) => (
                    <li key={i} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                            </svg>

                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium">{d.name}</span>
                                <span className="flex-shrink-0 text-gray-400">{d.size}mb</span>
                            </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <button onClick={() => {
                                deleteFile(i)
                            }} className="font-medium text-red-600 hover:text-red-500">
                                Hapus
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}