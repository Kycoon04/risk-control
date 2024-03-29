'use server'

export const postLogger = async (param: Logger): Promise<boolean> => {
    try {
        const response = await fetch('https://riskcontrol-logger.vercel.app/api/logger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: param.usuario,
                transaction_type: param.transaction_type,
                role: param.role,
                transaction: param.transaction,
                ip: param.ip,
                date: param.date
            })
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error de red', error);
        return false;
    }
};

interface Logger {
    id:string;
    usuario:string,
    transaction_type: string,
    role: string,
    transaction: string,
    ip: string,
    date: string,
};

export const fectLogger = async (param: Logger) => {
    const queryParams = new URLSearchParams(
        Object.entries(param)
            .filter(([_, value]) => value !== undefined && value !== "")
    ).toString();
    console.log(queryParams.toString())
    const res = await fetch(`https://riskcontrol-logger.vercel.app/api/logger?${queryParams}`, {
        cache: "no-store",
    });
    const data = await res.json();
    return {
        props: {
            data,
        }
    }
}