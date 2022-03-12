
export interface car {
    year: number,
    make:string,
    model: string,
    price: number,
    person_id: number,
}

export function Car (props: car) {
    console.log(props.year);
    return (
        <div className="car">
            <h3>
                car
                {props.year} {props.make} {props.model} {props.price}
                </h3>

            </div>
    )

}
