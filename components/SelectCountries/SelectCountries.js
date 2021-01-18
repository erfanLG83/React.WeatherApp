import React from 'react';
import Select from 'react-select';
import { useEffect, useState } from "react";
const SelectCountries = (props) => {

  const space = '                                   ';
  const [data,setData] = useState([]);
  const getCountries = async () =>{
    props.setLoading(true,"در حال بارگیری لیست کشورها");
    await fetch(
      'https://parseapi.back4app.com/classes/Country?limit=255&keys=name,native',
      {
        headers: {
          'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
          'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
        }
      })
      .then(res=>res.json())
      .then(r=>r.results)
      .then((d)=>{
        setData(d.map((item)=>{return {value:item.objectId,label:item.native}}))
      })
      .then(()=>{  
        props.setLoading(false,"");
      })

  }

  
  useEffect(()=>{
    if(data.length===0)
          getCountries()
  })
  
    return (
      <div className="select-container">
        <Select placeholder="کشور را انتخاب کنید ..." onChange={props.getCountry} options={data}/>
      </div>
    )
}
export default SelectCountries;
