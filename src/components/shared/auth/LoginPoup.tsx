import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { buyerRegisterValidation } from '../../../lib/validation';
import InputPassword from './InputPassword';
import { useBuyerRegister } from '../../../lib/react-query/auth';



interface LoginPoupProps {
    isLoginPoupOpen: boolean;
    setLoginPoup: () => void;
}

const LoginPoup: React.FC<LoginPoupProps> = ({ isLoginPoupOpen, setLoginPoup }) => {
    const buyerRegister = useBuyerRegister()
    const [userEmail,setUseremail]=useState('')
    const buyerRegisterForm = useForm<z.infer<typeof buyerRegisterValidation>>({
        resolver: zodResolver(buyerRegisterValidation),
        defaultValues: {
            email: "",
        },
    })


    function onSubmit(values: z.infer<typeof buyerRegisterValidation>) {
        buyerRegister.mutate(values)
        setUseremail(values['email'])
    }


    useEffect(()=>{
        buyerRegister.isSuccess&&toast.success('full')
        buyerRegister.isError&&toast.error('noooo')
    },[buyerRegister.isError,buyerRegister.isSuccess])


    return (
        <Dialog open={isLoginPoupOpen} onClose={setLoginPoup} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900 bg-opacity-35 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen ">
                <div className="flexCenter min-h-full p-4">
                    <DialogPanel
                        transition
                        className=" relative py-5 gap-5 flexCenter flex-col transform h-[550px] max-sm:h-[400px] overflow-hidden rounded-lg w-[500px] max-md:w-11/12 bg-white shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in "
                    >
                        <button onClick={setLoginPoup} className=' absolute w-fit rounded-full top-4 z-10 right-4 p-2 bg-gray-200 text-2xl'>
                            <IoMdClose></IoMdClose>
                        </button>
                        <div className='overflow-hidden flex w-full relative h-60'>
                            <motion.div
                                className='flex  absolute h-full w-full'
                                animate={{
                                    translateX: ['100%', '-100%'],
                                    transition: { duration: 8, repeat: Infinity, repeatDelay: 0, ease: 'linear' }
                                }}
                            >
                                <img className='object-fill'
                                    src="/تنزيل.png"
                                    alt="Truck Delivery"
                                />
                                <img className='object-fill'
                                    src="/تنزيل.png"
                                    alt="Discount"
                                />
                            </motion.div>

                            <motion.div
                                className='flex  absolute h-full w-full'
                                animate={{
                                    translateX: ['100%', '-100%'],
                                    transition: { duration: 8, repeat: Infinity, repeatDelay: 0, ease: 'linear', delay: 4 } // تأخير يبدأ بعد الحركة الأولى
                                }}
                            >
                                <img className='object-fill'
                                    src="/تنزيل.png"
                                    alt="Truck Delivery"
                                />
                            </motion.div>
                        </div>
                        {buyerRegister.isSuccess ? (
                            <InputPassword email={userEmail}></InputPassword>
                        ) : (

                            <form onSubmit={buyerRegisterForm.handleSubmit(onSubmit)} className='flexCenter flex-col w-full gap-4' >
                                <h3 className=' text-start font-bold text-blackText text-3xl'>مرحبا بك!</h3>
                                <div className=" relative gap-1 flexCenter flex-col w-full">
                                    <input
                                        {...buyerRegisterForm.register('email')}
                                        className="w-10/12 rounded-md text-gray-700 text-lg h-11 px-3 placeholder:text-sm placeholder:h-12 outline-none border-gray-400 border-2 focus:border-blue-400"
                                        placeholder="البريد الألكتروني"
                                        type="email"
                                    />
                                    <span className='text-sm text-Red'>{buyerRegisterForm.formState.errors.email?.message}</span>
                                </div>
                                <button
                                    className={`px-8 flexCenter h-12 w-52 font-bold button1 ${buyerRegister.isPending? 'buttonDisabled' : 'button1'} `}
                                >
                                    {buyerRegister.isPending? (<span className="form-loader"></span>): "تسجيل"}
                                </button>
                            </form>
                        )}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default LoginPoup;
