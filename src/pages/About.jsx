import React from 'react';
import Img from '../assects/1.png';

const About = () => {
    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <section className="h-auto w-full bg-gradient-to-r from-purple-500 to-pink-500 py-16 px-8 md:px-20 text-center flex flex-col md:flex-row justify-center items-center">
                <div className="flex-1 flex flex-col justify-center items-center text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">ChatMate Platform for Random Text and File Sharing</h2>
                    <p className="text-base md:text-lg mb-8">
                        ChatMate is an application that uses the most advanced artificial intelligence technology.
                        It can mimic human conversation and provide you with a natural and authentic dialogue experience.
                        It also has a strong self-learning ability and can truly create content on its own.
                    </p>
                </div>
                <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
                    <img src={Img} alt="ChatMate" className="max-w-full h-auto object-contain rounded-lg" />
                </div>
            </section>

            {/* Journey Section */}
            <section className="py-16 px-4 md:px-20 flex flex-col justify-center items-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Journey</h2>
                <div className="flex flex-col gap-10">

                    <div className={`flex flex-col md:flex-row items-center gap-6  md:text-left'md:flex-row-reverse'}`}>
                        <img src="https://via.placeholder.com/200" alt="Journey" className="rounded-full w-36 h-36 md:w-48 md:h-48" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2">The Vision</h3>
                            <p className="text-sm md:text-base max-w-[700px]">
                                ChatMate is an application that uses the most advanced artificial intelligence technology.
                                It can mimic human conversation and provide you with a natural and authentic dialogue experience
                                . It also has a strong self-learning ability and can truly create content on its own.
                            </p>
                        </div>
                    </div>
                    <div className={`flex flex-col md:flex-row items-center gap-6  md:text-left'md:flex-row-reverse'}`}>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">The Vision</h3>
                            <p className="text-sm md:text-base max-w-[700px]">
                                ChatMate is an application that uses the most advanced artificial intelligence technology.
                                It can mimic human conversation and provide you with a natural and authentic dialogue experience
                                . It also has a strong self-learning ability and can truly create content on its own.
                            </p>
                        </div>
                        <img src="https://via.placeholder.com/200" alt="Journey" className="rounded-full w-36 h-36 md:w-48 md:h-48" />
                    </div>
                    <div className={`flex flex-col md:flex-row items-center gap-6  md:text-left'md:flex-row-reverse'}`}>
                        <img src="https://via.placeholder.com/200" alt="Journey" className="rounded-full w-36 h-36 md:w-48 md:h-48" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2">The Vision</h3>
                            <p className="text-sm md:text-base max-w-[700px]">
                                ChatMate is an application that uses the most advanced artificial intelligence technology.
                                It can mimic human conversation and provide you with a natural and authentic dialogue experience
                                . It also has a strong self-learning ability and can truly create content on its own.
                            </p>
                        </div>
                    </div>
                    <div className={`flex flex-col md:flex-row items-center gap-6  md:text-left'md:flex-row-reverse'}`}>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">The Vision</h3>
                            <p className="text-sm md:text-base max-w-[700px]">
                                ChatMate is an application that uses the most advanced artificial intelligence technology.
                                It can mimic human conversation and provide you with a natural and authentic dialogue experience
                                . It also has a strong self-learning ability and can truly create content on its own.
                            </p>
                        </div>
                        <img src="https://via.placeholder.com/200" alt="Journey" className="rounded-full w-36 h-36 md:w-48 md:h-48" />
                    </div>

                    <div className={`flex flex-col md:flex-row items-center gap-6  md:text-left'md:flex-row-reverse'}`}>
                        <img src="https://via.placeholder.com/200" alt="Journey" className="rounded-full w-36 h-36 md:w-48 md:h-48" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2">The Vision</h3>
                            <p className="text-sm md:text-base max-w-[700px]">
                                ChatMate is an application that uses the most advanced artificial intelligence technology.
                                It can mimic human conversation and provide you with a natural and authentic dialogue experience
                                . It also has a strong self-learning ability and can truly create content on its own.
                            </p>
                        </div>
                    </div>


                </div>
            </section>

            {/* Impact Section */}
            <section className="py-16 px-4 md:px-20 flex flex-col justify-center items-center">
                <div className="bg-black text-white py-16 w-full">
                    <div className="container mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Impact</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                            {[
                                { value: '5M+', label: 'Monthly Active Users' },
                                { value: '19M+', label: 'Video Chats per Week' },
                                { value: '10M+', label: 'Messages Sent Daily' },
                            ].map((item, index) => (
                                <div key={index} className="bg-gray-800 rounded-lg p-6 text-center">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.value}</h3>
                                    <p className="text-sm md:text-lg">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
