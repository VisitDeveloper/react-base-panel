import React,{useState} from 'react'

export default function TestP() {
    const [files, setFiles] = useState<object>({});

    const [value, setValue] = useState('hello')
    const throttledValue = useThrottle<string>(value,1000)
  
    useEffect(() => console.log(`throttledValue changed: ${throttledValue}`), [
      throttledValue,
    ])
  
    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      setValue(event.target.value)
    }
  return (
    <div>TestP

    <BreadCrumbComponent 
          withOutArray={false}
          breadcrumbs={[
            {
              id:1,
              label:'خانه',
              href:APP_ROUTES.ROOT,
              icon:<AiOutlineHome/>
            },
            {
              id:1,
              label:'Customer',
              href:APP_ROUTES.CREATE_USER
            },
            {
              id:1,
              label:'Home',
              href:'/'
            }
          ]}
        />

      <BreadCrumbComponent />

        <UploadFile 
            name='test'
            url={END_POINTS.TUS_UPLOAD}
            setFiles={setFiles}
            value={files}
            id='red'
            width={'350px'}
            height={'200px'}
            isTusProtocol={true}
            accept={ACCEPT_ENUMS.IMAGE}  
      />

        Input: <input value={value} onChange={onChange} />
        <p>Throttled value: {throttledValue}</p>
    </div>
  )
}
