import React, { useState } from 'react'; //import React Component

function CreateAccountForm() {

    /* const [typedVal, setTypedVal] = useState("");

    const handleChange = (event) => {
        const inputValue = event.target.value;
        setTypedVal(inputValue);

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit form with", typedValue);

    } */
    return(
    <form className='application-form'>
        <div className="container">
            <div className='row'>
                <div className="col">
                    <label htmlFor="first-name" className="form-label">First Name <span className="required" /* onChange={handleChange} */> *</span></label>
                    <input type="text" className="form-control" name="first-name" id="first-name" required></input>
                </div>

                <div className="col">
                    <label htmlFor="last-name" className="form-label">Last Name<span className="required" /* onChange={handleChange} */> *</span></label>
                    <input type="text" className="form-control" name="last-name" id="last-name" required></input>
                </div>
            </div>

            <div className='row'>
                <div className="col">
                    <label htmlFor="grad-year" className="form-label">Intended Graduation Year<span className="required" /* onChange={handleChange} */> *</span></label>
                    <input type="text" className="form-control" placeholder="example: 2024" name="grad-year" id="grad-year"
                        required></input>
                </div>

                <div className="col">
                    <label htmlFor="major" className="form-label">Major/Intended Major<span className="required" /* onChange={handleChange} */>
                        *</span></label>
                    <input type="text" className="form-control" name="degree" id="degree" required></input>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <label htmlFor="Email" className="form-label">Email address<span className="required" /* onChange={handleChange} */> *</span></label>
                    <input type="email" className="form-control" placeholder="name@example.com" name="email" id="email"
                        required></input>
                </div>
            </div>
            <div className="col-7 mb-3">
                <label htmlFor="password" className="form-label">Password<span className="required" /* onChange={handleChange} */> *</span></label>
                <input type="password" className="form-control" name="password" id="password" required></input>
            </div>

            <div className="col-12 text-center">
                <button className="submit btn tbn-primary" type="submit">Submit</button>
            </div>
        </div>
    </form >
    );

}



export function CreateAccountPage() {

    return (
        <div className="create-acount">
            <h1>Create an account!</h1>
            <CreateAccountForm />
        </div>
    )


}