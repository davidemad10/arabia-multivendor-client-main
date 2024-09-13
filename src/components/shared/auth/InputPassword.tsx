import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useBuyerRegister, useLogin } from '../../../lib/react-query/auth';
import { toast } from 'react-toastify';


interface InputPasswordProps {
    email: string;
}
const InputPassword: React.FC<InputPasswordProps> = ({ email }) => {
    // Referencing each input field
    const login = useLogin()
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];


    const [seconds, setSeconds] = useState<number>(30);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const buyerRegister = useBuyerRegister()
    // Function to start the countdown
    const startCountdown = useCallback(() => {
        buyerRegister.mutate({'email':email})
        setIsDisabled(true);
        setSeconds(30);
    }, []);

    useEffect(() => {
        if (isDisabled) {
            const timer = setInterval(() => {
                setSeconds(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isDisabled]);


    const [values, setValues] = useState<string[]>(Array(6).fill(''));

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const nextIndex = index + 1;

        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        if (value.length >= e.target.maxLength && nextIndex < inputRefs.length) {
            inputRefs[nextIndex].current?.focus();
        }

        if (newValues.every(val => val.length === 1)) {
            login.mutate({ 'email': email, 'password': newValues.join('') })
        }
    };

    useEffect(() => {
        login.isSuccess && location.reload()
        login.isError && toast.error('noooo')
        buyerRegister.isSuccess&&toast.success('full')
        buyerRegister.isError&&toast.error('noooo')
    }, [login.isError, login.isSuccess,buyerRegister.isError,buyerRegister.isSuccess])

    return (
        <div className='flexCenter flex-col gap-4'>

            <h2>{email}</h2>

            <div dir='ltr' className="password flex gap-2">
                {inputRefs.map((inputRef, index) => (
                    <input
                        key={index}
                        ref={inputRef}
                        maxLength={1}
                        className="input border rounded-md p-2 border-gray-400 text-center max-sm:w-8 max-sm:h-10 w-12 h-12 lg:text-xl"
                        type="text"
                        onChange={(e) => handleChange(e, index)}

                    />
                ))}
            </div>

            <span className=' text-gray-400'> انتظر {seconds} ثانية</span>
            <button
                onClick={startCountdown}
                disabled={isDisabled}
                className={`px-8 h-12 w-52 font-bold  ${isDisabled ? 'buttonDisabled' : 'button1'}`}
            >
                ارسال مره اخري
            </button>
        </div>
    );
};

export default InputPassword;



















