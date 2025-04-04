import React from "react"
import { ErrorMessage, useField } from "formik"
import TextError from "./TextError"

function Input({label, name, inputRef, ...rest}) {
  const [field, meta] = useField(name)
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-500"
      >
        {label}
      </label>
      <input
        className={`px-1 py-[4px] border text-gray-500 border-gray-300 rounded transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 ${
          meta.touched && meta.error ? "border-red-600 border-2" : null
        }`}
        id={name}
        onChange={field.onChange}
        type="password"
        ref={inputRef} // Set the ref here 
        {...field}
        {...rest}
        // edit edilirken hata vermesin diye value degeri eklendi sorun olursa kaldır
        value={field.value || ""}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Input