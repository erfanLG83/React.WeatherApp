import Select from 'react-select'
import { useState ,useEffect} from 'react'


  
const SelectCities = (props) => {
    const [cities, setCities] = useState([
        {value:"" , }
      ]);

    const [lastId,setLastId] = useState("");

    useEffect(()=>{
        if(props.id!==lastId)
        {
            setLastId(props.id);
            getCities();
        }
    })
    const getCities=async ()=>{
            props.setLoading(true,"در حال بارگیری لیست شهرها");
            const where = encodeURIComponent(JSON.stringify({
                "country": {
                  "__type": "Pointer",
                  "className": "Country",
                  "objectId": `${props.id}`
                }
              }));
              await fetch(
                `https://parseapi.back4app.com/classes/City?limit=200&keys=name,cityId&where=${where}`,
                {
                  headers: {
                    'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
                    'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
                  }
                }
              ).then(r=>r.json()
              ).then(res=>res.results).then(data=>{
                  return data.map(item=>{ return {value:{id:item.cityId,cityName:item.name},label:item.name}})
              }
              ).then(options=>{
                setCities(options);
                props.setLoading(false,"");
              });
    }

    return (
        <div className="select-container">
            <Select placeholder="شهر را انتخاب کنید ..." onChange={props.getCity} options={cities} />
        </div>
    )
}
export default SelectCities;