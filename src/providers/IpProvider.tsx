import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type IpProviderProps = {
    children: ReactNode
}

type IpProviderState = {
    ip: string,
}

const initState = {
    ip: '',
}

export const IpContext = createContext<IpProviderState>(initState)

export function IpProvider({ children }: IpProviderProps) {
    let ignore = false
    const [ip, setIp] = useState('')

    useEffect(() => {
        console.log('ip provider')
        if (!ignore) {
            getIpAdress()
            ignore = true
        }
    }, [])

    const getIpAdress = async () => {
        try {
            const res = await axios.get('https://api.ipify.org?format=json')
            console.log('ip', res.data)
            setIp(res.data.ip)
        } catch (error) {
            console.error(error)
        }
    }

    const value = {
        ip,
    }

    return (
        <IpContext.Provider value={value}>
            {children}
        </IpContext.Provider>
    )
}

export const useIp = () => {
    const context = useContext(IpContext)

    if (context === undefined)
        throw new Error("useIp must be used within a IpProvider")

    return context
}