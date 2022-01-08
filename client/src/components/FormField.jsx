import { useState, useEffect } from 'react';

export default function FormField(props) {
    const [errorMsg, setErrorMsg] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(props.value);
    }, [props]);

    const validate = (target) => {
        const value = target.value;
        let errors = [];
        if (props.isrequired && value === '') {
            errors.push('Entry is required');
        }
        if (props.minlength && value.trim().length < parseInt(props.minlength)) {
            errors.push('Min length is ' + props.minlength);
        }
        if (errors.length === 0) {
            setErrorMsg('');
        } else {
            setErrorMsg(errors.join(' ... '));
        }
        target.setAttribute('errors', errorMsg);
    };

    const formElement = (type) => {
        switch (type) {
            case 'text':
            case 'number':
                return (
                    <input
                        className={type === 'number' ? 'form-field col-5' : 'form-field col-12'}
                        type={props.type}
                        id={props.name}
                        name={props.name}
                        value={value}
                        placeholder={props.label}
                        isrequired={props.isRequired}
                        minLength={props.minLength}
                        errors={errorMsg}
                        onBlur={function (ev) {
                            validate(ev.target);
                        }}
                        onChange={(ev) => setValue(ev.target.value)}
                        style={{ margin: 0 }}
                        readOnly={props.readonly || false}
                    />
                );
            case 'select':
                return (
                    <select
                        className="form-field col-5"
                        type={props.type}
                        id={props.name}
                        name={props.name}
                        value={value}
                        placeholder={props.label}
                        isrequired={props.isRequired}
                        errors={errorMsg}
                        onBlur={function (ev) {
                            validate(ev.target);
                        }}
                        onChange={(ev) => {
                            setValue(ev.target.value);
                        }}
                        style={{ margin: 0 }}
                        readOnly={props.readonly || false}
                    >
                        {props.options.map((option, idx) => (
                            <option key={idx} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
        }
    };

    return (
        <div className="form-field">
            <div className="label" htmlFor={props.name}>
                {props.label}
            </div>
            {formElement(props.type)}
            {errorMsg !== '' ? <div className="error-msg">{errorMsg}</div> : null}
        </div>
    );
}
