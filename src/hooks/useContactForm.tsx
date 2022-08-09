import { useState } from "react";
import { toast } from "react-toastify";

export const useContactForm = (defaults: {
  fullName: "";
  email: "";
  subject: "";
  message: "";
  mapleSyrup: "";
}) => {
  // state
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(defaults);

  // handle form values
  function updateValue(e) {
    let { value } = e.target;
    if (e.target.type === "number") {
      value = parseInt(e.target.value);
    }

    setValues({
      // copy existing values
      ...values,
      // update the new value that changed
      [e.target.name]: value,
    });
  }

  // contact form submit
  async function submitContactForm(e) {
    e.preventDefault();
    setLoading(true);

    // gather all the data
    const body = {
      fullName: values.fullName,
      email: values.email,
      subject: values.subject,
      message: values.message,
      mapleSyrup: values.mapleSyrup,
    };

    // send this data to serverless function
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/contactForm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const text = JSON.parse(await res.text());

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      toast.error(`❌ ${text.message}`, {
        autoClose: 50000,
        hideProgressBar: true,
      });
    } else {
      // it worked!
      setLoading(false);
      toast.success(`💪 Thanks! I'll respond as soon as possible 🤘`);
      setValues(defaults);
    }
  }

  return {
    loading,
    submitContactForm,
    values,
    updateValue,
  };
};
