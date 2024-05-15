import React from "react";
import Spinner from "../notifications/Spinner";
import Preview_Section from "../sections/preview_section";
import Barchart from '../graphics/Barchart';
import Radarchart from '../graphics/Radarchart';
import Pie from '../graphics/Pie'

const ModuloMadurezSection: React.FC<{
    isLoading: boolean;
    formsComplete: string | undefined;
    barData: any;
    sections: any[];
}> = ({ isLoading, formsComplete, barData, sections }) => {
    return (
        <div className="bg-blue-1000 w-90vw md:w-90 sm:w-[90%] m-10 rounded-md justify-center">
            <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
                Modulo de madurez
            </h1>
            <div className="m-5">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        {formsComplete === "Completado" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                                <div className="w-full sm:h-96 flex justify-center items-center">
                                    <Barchart data={barData} />
                                </div>
                                <div className="w-full sm:h-96 flex justify-center items-center">
                                    <Radarchart data={barData} />
                                </div>
                            </div>
                        ) : (
                            sections.map((form) => (
                                <Preview_Section key={form.id} id={form.id} name={form.name} description={form.description} forms={form.forms} complete={form.complete} />
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ModuloMadurezSection;
