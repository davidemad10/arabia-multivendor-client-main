import { IoMdClose } from 'react-icons/io'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]


interface SideCartProps {
    isCartOpen: boolean;
    setSideCart: () => void;
}

const SideCart: React.FC<SideCartProps> = ({ isCartOpen, setSideCart }) => {

    return (
        <Dialog open={isCartOpen} onClose={setSideCart} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900 bg-opacity-35 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen ">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className=" fixed flex flex-col flexStart h-screen rounded-lg bg-white  shadow-xl transition-all  data-[closed]:opacity-0 data-[open]:left-0 data-[closed]:-translate-x-96 data-[enter]:duration-200 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in  w-96 "
                    >
                        <div className="flex h-full flex-col  bg-white">
                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                                    <div className=" rtl:mr-3 ltr:ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            onClick={setSideCart}
                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Close panel</span>
                                            <IoMdClose aria-hidden="true" className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {products.map((product) => (
                                                <li key={product.id} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            alt={product.imageAlt}
                                                            src={product.imageSrc}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className=" rtl:mr-4 ltr:ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <a href={product.href}>{product.name}</a>
                                                                </h3>
                                                                <p className=" rtl:mr-4 ltr:ml-4">{product.price}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500">Qty {product.quantity}</p>

                                                            <div className="flex">
                                                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$262.00</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Checkout
                                    </a>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <button
                                            type="button"
                                            onClick={setSideCart}
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default SideCart;
