import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from '../libs/axios'
import { useIp } from '../providers/IpProvider'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export function ModalPermaklumat() {
    const { ip } = useIp()
    const [open, setOpen] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const cancelButtonRef = useRef(null)

    const saveHaveReadPermaklumat = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await axios.post('/api/maklumat',
                { ip: ip },
                {
                    headers: {
                        'Authorization': 'Basic c3VydmV5c2lzZGE6cGFzczJzaXNkYXN1cnZleQ=='
                    }
                }
            )
            console.log('have read', res.data)
            setOpen(false)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-950 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                <div className="bg-white p-2">
                                    {/* <div className="sm:flex sm:items-start">

                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Deactivate account
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to deactivate your account? All of your data will be permanently
                                                    removed. This action cannot be undone.
                                                </p>
                                            </div>

                                        </div>
                                    </div> */}
                                    <img className="w-full rounded-lg" src="/permaklumat.png" alt="" />
                                </div>
                                <div className="bg-gray-50 px-4 py-3 flex justify-center">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
                                        onClick={() => setOpen(false)}

                                    >
                                        {isLoading ? 'Loading...' :
                                            'Kami telah membaca dan memahami maklumat pelayanan BBWS NT I Mataram'}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
