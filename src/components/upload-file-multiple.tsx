import { useEffect, useState } from "react";
import axios from "../libs/axios";
import { Icons } from "./icons";
// import { TrashIcon } from "@radix-ui/react-icons";

type UploadFileProps = {
    name: string
    value: []
    onChange?: (d: any) => void
}

export function UploadFileMultiple({ name, value, onChange }: UploadFileProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState<[]>(value);

    useEffect(() => {
        setPhoto(value)
    }, [value])

    useEffect(() => {
        console.log('photo', photo)
    }, [photo])

    const uploadFile = async (data: any) => {
        setIsLoading(true);
        try {
            console.log('data files', data)
            const fData = new FormData();

            for (let i = 0; i < data.length; i++) {
                console.log('fl', data[i])
                console.log('fl name', data[i].name)
                fData.append("files", data[i]);
            }

            // data.forEach((file: any) => {
            //     fData.append("files", file)
            // });

            console.log('files', fData)
            const res = await axios.post("/api/upload/multi", fData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("upload", res.data.data);
            setPhoto(res.data.data);
            if (onChange) {
                let e = {
                    target: {
                        name: name,
                        value: res.data.data
                    }
                }
                onChange(e);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center w-full relative">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="w-full h-full flex justify-center items-center">
                            <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
                        </div>
                    </div>
                )}

                {!isLoading && (
                    <>
                        <label htmlFor={name} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id={name} type="file" className="hidden" multiple onChange={(e) => {
                                console.log('e photo', e.target?.files)
                                uploadFile(e.target.files)
                            }} />
                        </label>
                    </>
                )}
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
                {photo && photo.map((d: any, i: any) => (
                    <img key={i} className="w-full" src={`${axios.defaults.baseURL}${d}`} alt="" />
                ))}

                {/* {JSON.stringify(photo)} */}
            </div>
        </>
    )
}