import Wave from "react-wavify"
import { Link } from "react-router-dom"

export default function Thanks() {
    return (
        <>


            <div className="relative w-full">
                <div className="absolute w-full top-0">
                    <div className="bg-gradient-to-b from-blue-950 to-blue-800 w-full h-[450px] relative">
                        <div className="absolute bottom-0 w-full">
                            <Wave fill='#ffffff'
                                paused={false}
                                style={{ display: 'flex', opacity: 0.5 }}
                                options={{
                                    height: 30,
                                    amplitude: 30,
                                    speed: 0.09,
                                    points: 3
                                }}
                            />
                        </div>
                        <div className="absolute bottom-0 w-full">
                            <Wave fill='#ffffff'
                                paused={false}
                                style={{ display: 'flex', opacity: 0.7 }}
                                options={{
                                    height: 30,
                                    amplitude: 30,
                                    speed: 0.12,
                                    points: 3
                                }}
                            />
                        </div>
                        <div className="absolute bottom-0 w-full">
                            <Wave fill='#ffffff'
                                paused={false}
                                style={{ display: 'flex', opacity: 1 }}
                                options={{
                                    height: 30,
                                    amplitude: 30,
                                    speed: 0.15,
                                    points: 3
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-3xl px-4 pt-16 relative z-10">
                    <div className="p-16 bg-white shadow rounded-xl border mt-32">
                        <div className="text-center text-3xl font-bold">Terima Kasih</div>
                        <div className="text-center font-medium mt-8">Terima kasih sudah ikut berpartisipasi dalam meningkatkan kualitas pelayanan<br /> Balai Wilayah Sungai Nusa Tenggara 1</div>

                        <div className="flex justify-center mt-8">
                            <Link to={'http://sda.pu.go.id/balai/bwsnt1'}>
                                <button
                                    className="rounded-md mt-2 w-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Kembali ke Web BWS NT 1
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}