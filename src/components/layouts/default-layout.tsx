import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { ModalPermaklumat } from "../modal-permaklumat";

export function DefaultLayout() {
    return (
        <>
            <div className='w-full min-h-screen'>
                <Navbar />

                <div className="relative w-full">
                    <Outlet />
                </div>
            </div>

            <ModalPermaklumat />

            <Footer />
        </>
    )
}