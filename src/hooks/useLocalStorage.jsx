import { useEffect, useState } from "react";

export function useLocalStorage(localStorageItemName, initialValue) {

    const [data, setData] = useState(initialValue)

    useEffect(() => {

        localStorage.setItem(localStorageItemName, data)
        
    }, [data])

    return [data, setData]

}