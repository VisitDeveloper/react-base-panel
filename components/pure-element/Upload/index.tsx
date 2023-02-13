// library
import React, {
    ForwardedRef,
    forwardRef,
    DragEvent,
    FormEvent,
    ChangeEvent,
    SetStateAction,
    Dispatch,
    useCallback,
  } from "react";
  import { useTus } from "use-tus";
  import LinearProgress from "@mui/material/LinearProgress";
  import ClipLoader from "react-spinners/ClipLoader";
  import axios from "axios";
  import { useTranslation } from "react-i18next";
  import { MdErrorOutline } from "react-icons/md";
  import { ImWarning } from "react-icons/im";
  import { BsCheck2Circle } from "react-icons/bs";
  //custom
  import {
    UploadStyled,
    InputStyled,
    LabelStyled,
    DragFilePosition,
    FormStyled,
    ShowErrorFileUnderButton,
    ShowItemNameNewStyle,
    InnerfileUploader,
    SuccessInfoAfterSubmit,
  } from "./style";
  import { END_POINTS } from "constants/enum/end-points.enum";
  import { useAppSelector } from "redux/hooks";
  import { RootState } from "redux/store";
  import { IAuth } from "model/redux/auth";
  import { SuccessToast } from "components/toast-view/func-toast";
  import { ToastRenderFuncProps } from "model/etc/toast-final.model";
  import { ACCEPT_ENUMS } from "constants/enum/accept-input.enum";
  import {
    AcceptGenerateToString,
    isIncludedType,
  } from "tools/pure-function/accept-file-generate";
  import FileUploadComponent from "components/icons/FileUpload";
  
  type TypeInput = "file";
  interface UploadProps {
      setFiles: Dispatch<SetStateAction<object>>;
      value: object;
      id: string;
      url: string;
      accept: ACCEPT_ENUMS;
      name: string;
      setIDs?: Dispatch<SetStateAction<string | undefined>>;
  
      isTusProtocol?: boolean;
      width?: string;
      height?: string;
      className?: string;
      classNameInput?: string;
      classNameLabel?: string;
      disabled?: boolean;
      multiple?: boolean;
      style?: object;
      type?: TypeInput;
      maximumSize?: number;
      customCard?: JSX.Element;
      lable?: string;
  
    toastMessageTitle?: string;
    toastMessageDesc?: string;
    toastId?: string | number;
  }
  
  const UploadFile = forwardRef(
    (
      props: UploadProps,
      ref: ForwardedRef<HTMLInputElement | null>
    ): JSX.Element => {
      const { t } = useTranslation();
      const messageSuccess: ToastRenderFuncProps = {
        title: props.toastMessageTitle
          ? props.toastMessageTitle
          : t("theFileHasBeenUploaded"),
        description: props?.toastMessageDesc
          ? props?.toastMessageDesc
          : t("yourFileHasBeenSuccessfullyUploaded")!,
        id: props.toastId ? props.toastId : "rn-succees-upload",
      };
  
      const [dragActive, setDragActive] = React.useState<boolean>(false);
      const { upload, setUpload } = useTus({ autoAbort: true });
      const auth = useAppSelector((store: RootState): IAuth => store.auth);
      const { token } = auth;
  
      const mgabit_5 = 1024 * 5000;
      const [percent, setPercent] = React.useState<number>(0);
      const [loading, setLoading] = React.useState<boolean>(false);
      const [succees, setSuccess] = React.useState<boolean>(false);
      const [isIncludedTypeFormat, setIsIncludedTypeFormat] =
        React.useState<boolean>(false);
      const [isIncludedSize, setIsIncludedSize] = React.useState<boolean>(false);
  
      const handleDrag = function (
        e: DragEvent<HTMLDivElement> | FormEvent<HTMLFormElement>
      ) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
      };
      
  
      const handleDrop = function (e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          if (e.dataTransfer.files[0].size > props.maximumSize!) {
            setIsIncludedSize(true);
            if (isIncludedType(props.accept, e.dataTransfer.files)) {
              setIsIncludedTypeFormat(false);
              props.setFiles(e.dataTransfer.files);
            } else if (!isIncludedType(props.accept, e.dataTransfer.files)) {
              setIsIncludedTypeFormat(true);
            }
          } else {
            setIsIncludedSize(false);
            if (isIncludedType(props.accept, e.dataTransfer.files)) {
              setIsIncludedTypeFormat(false);
              props.setFiles(e.dataTransfer.files);
            } else if (!isIncludedType(props.accept, e.dataTransfer.files)) {
              setIsIncludedTypeFormat(true);
            }
          }
        }
  
          if (props.isTusProtocol) {
              if (props.multiple) {
                  Object.entries(e?.dataTransfer?.files!).map(([key, value]: any) =>
                      setUpload(value, {
                          endpoint: `${process.env.REACT_APP_BASE_URL}/${END_POINTS.MEDIA_MANAGMENT}${props.url}`,
                          headers: {
                              "X-VERSION": `${process.env.REACT_APP_VERSION}`,
                              "X-REALM": "smartbss",
                              Authorization: "Bearer " + token.access_token,
  
                          },
                          metadata: {
                              filename: value.name,
                              filetype: value.type,
                          },
                          chunkSize: mgabit_5, // 5mb
                          onProgress: function (bytesUploaded: number, bytesTotal: number): void | null {
                              let percentage: any = (bytesUploaded / bytesTotal * 100).toFixed(2)
                              setPercent(percentage)
                          },
                          onSuccess: function () {
                              setLoading(false)
                              SuccessToast(messageSuccess)
                              setSuccess(true)
                          },
                          onAfterResponse: function (req, res) {
                              let url = req.getURL()
                              if(url.split('/')[5] !== 'files?uploadId='){
                                  console.log('res' ,url.split('/')[5])
                                  props.setIDs!(url.split('/')[5])
                              }
                          }
                      },
                      )
                  )
              } else {
                  setUpload(e?.dataTransfer?.files!.item(0)!, {
                      endpoint: `${process.env.REACT_APP_BASE_URL}/${END_POINTS.MEDIA_MANAGMENT}${props.url}`,
                      headers: {
                          "X-VERSION": `${process.env.REACT_APP_VERSION}`,
                          "X-REALM": "smartbss",
                          Authorization: "Bearer " + token.access_token,
  
                      },
                      metadata: {
                          filename: e?.dataTransfer?.files!.item(0)!.name,
                          filetype: e?.dataTransfer?.files!.item(0)!.type,
                      },
                      chunkSize: mgabit_5, // 5mb ,
                      onProgress: function (bytesUploaded: number, bytesTotal: number): void | null {
  
                          let percentage: any = (bytesUploaded / bytesTotal * 100).toFixed(2)
                          setPercent(percentage)
                      },
                      onSuccess: function () {
                          setLoading(false)
                          SuccessToast(messageSuccess)
                          setSuccess(true)
                      },
                      onAfterResponse: function (req, res) {
                          let url = req.getURL()
                          if (url.split('/')[5] !== 'files?uploadId=') {
                              console.log('res', url.split('/')[5])
                              props.setIDs!(url.split('/')[5])
                          }
                      }
                  })
  
              }
          }
        }
      
  
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          if (e.target.files[0].size > props.maximumSize!) {
            setIsIncludedSize(true);
            if (isIncludedType(props.accept, e.target.files)) {
              setIsIncludedTypeFormat(false);
              props.setFiles(e.target.files);
            } else if (!isIncludedType(props.accept, e.target.files)) {
              setIsIncludedTypeFormat(true);
            }
          } else {
            setIsIncludedSize(false);
            if (isIncludedType(props.accept, e.target.files)) {
              setIsIncludedTypeFormat(false);
              props.setFiles(e.target.files);
            } else if (!isIncludedType(props.accept, e.target.files)) {
              setIsIncludedTypeFormat(true);
            }
          }
        }
  
          if (props.isTusProtocol) {
              if (props.multiple) {
                  Object.entries(e?.target?.files!).map(([key, value]: any) =>
                      setUpload(value, {
                          endpoint: `${process.env.REACT_APP_BASE_URL}/${END_POINTS.MEDIA_MANAGMENT}${props.url}`,
                          headers: {
                              "X-VERSION": `${process.env.REACT_APP_VERSION}`,
                              "X-REALM": "smartbss",
                              Authorization: "Bearer " + token.access_token,
  
                          },
                          metadata: {
                              filename: value.name,
                              filetype: value.type,
                          },
                          chunkSize: mgabit_5, // 5mb
                          onProgress: function (bytesUploaded: number, bytesTotal: number): void | null {
                              let percentage: any = (bytesUploaded / bytesTotal * 100).toFixed(2)
                              setPercent(percentage)
                          },
                          onSuccess: function () {
                              setLoading(false)
                              SuccessToast(messageSuccess)
                              setSuccess(true)
                          },
                          onAfterResponse: function (req, res) {
                              let url = req.getURL()
                              if (url.split('/')[5] !== 'files?uploadId=') {
                                  console.log('res', url.split('/')[5])
                                  props.setIDs!(url.split('/')[5])
                              }
                          }
                      },
                      )
                  )
              } else {
                  setUpload(e?.target?.files!.item(0)!, {
                      endpoint: `${process.env.REACT_APP_BASE_URL}/${END_POINTS.MEDIA_MANAGMENT}${props.url}`,
                      headers: {
                          "X-VERSION": `${process.env.REACT_APP_VERSION}`,
                          "X-REALM": "smartbss",
                          Authorization: "Bearer " + token.access_token,
  
                      },
                      metadata: {
                          filename: e?.target?.files!.item(0)!.name,
                          filetype: e?.target?.files!.item(0)!.type,
                      },
                      chunkSize: mgabit_5, // 5mb ,
                      onProgress: function (bytesUploaded: number, bytesTotal: number): void | null {
  
                          let percentage: any = (bytesUploaded / bytesTotal * 100).toFixed(2)
                          setPercent(percentage)
                      },
                      onSuccess: function () {
                          setLoading(false)
                          SuccessToast(messageSuccess)
                          setSuccess(true)
                      },
                      onAfterResponse: function (req, res) {
                          let url = req.getURL()
                          if (url.split('/')[5] !== 'files?uploadId=') {
                              console.log('res', url.split('/')[5])
                              props.setIDs!(url.split('/')[5])
                          }
                      }
                  })
  
              }
          }
        }
      
  
      const handleStartUploadTus = useCallback(
        (e: React.SyntheticEvent) => {
          e.preventDefault();
  
          if (!upload) {
            return;
          }
  
          setLoading(true);
          upload.start();
        },
        [upload]
      );
  
      const handleAbort = useCallback(() => {
        if (!upload) {
          return;
        }
  
        upload.abort();
      }, [upload]);
  
      React.useEffect(() => {
  
          if (Object.entries(props.value).length !== 0 && (!isIncludedTypeFormat && !isIncludedSize)) {
              if (!upload) {
                  return;
              }
              setLoading(true)
              upload.start()
          }
      }, [props.value])
       
  
  
      const handleUploadFileWithrestApi = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
          setLoading(true);
          const formdata = new FormData();
          formdata.append("name", "this is test");
          const res = await axios.post(props.url, formdata);
  
          console.log(res);
        } catch (e) {
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
  
      return (
        <>
          <FormStyled
            onDragEnter={handleDrag}
            onSubmit={(e: React.SyntheticEvent) => {
              if (props.isTusProtocol) {
                handleStartUploadTus(e);
              } else {
                handleUploadFileWithrestApi(e);
              }
            }}
          >
            <UploadStyled
              style={props.style}
              isFileAvailable={
                Object.entries(props.value).length !== 0 ? true : false
              }
              height={props.height}
              width={props.width}
              className={`${props.className} rounded-lg`}
            >
              <LabelStyled
                className={`${props.classNameLabel}`}
                htmlFor={props.id}
              >
                {props!.customCard! ? (
                  props!.customCard!
                ) : (
                  <InnerfileUploader className="flex flex-col gap-4 w-full ">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <FileUploadComponent />
                    </div>
                    <div className="item-inner text-sm">
                      <span>
                        {props.lable
                          ? props.lable
                          : t(
                              "uploadThePictureOnYourNationalCardOrLeaveItInTheBox"
                            )}
                      </span>
                      <span className="item-btn">{t("upload")} ...</span>
                    </div>
                    <div
                      className="flex text-xs gap-2"
                      style={{ marginRight: "25px" }}
                    >
                      <ImWarning />
                      {t("maximumFileSize50MB")}
                    </div>
                    <div
                      className="flex text-xs gap-2"
                      style={{ marginRight: "25px" }}
                    >
                      <ImWarning />
                      {t("allowedFiles")}
                      {AcceptGenerateToString(props.accept)}
                    </div>
                  </InnerfileUploader>
                )}
              </LabelStyled>
              <InputStyled
                ref={ref}
                type={props.type ? props.type : "file"}
                id={props.id}
                className={`${props.classNameInput}`}
                disabled={props.disabled}
                name={props.name}
                onChange={handleChange}
                multiple={props.multiple}
                accept={props.accept}
              />
              {dragActive && (
                <DragFilePosition
                  className="rounded-lg"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                />
              )}
            </UploadStyled>
  
                  {
                      succees === false && Object.entries(props?.value).map(([key, value]: any) =>
                          <>
                              <ShowItemNameNewStyle key={value.lastModified} width={props.width}>
                                  {loading === true && (
                                      <span className='text-xs'>
                                          {t('upload')}....
                                      </span>
                                  )}
                                  <div className='flex flex-col' >
                                      <span className='showitem-name text-xs text-left'>{value.name}</span>
                                      <div className='flex flex-row gap-2.5'>
                                          <span className='text-xs text-right mt-0.5	' style={{ color: '#ABABAB' }}>
                                              {percent}
                                          </span>
                                          <LinearProgress variant="determinate" value={percent} sx={{ width: '96%' }} className={'my-2.5 '} />
                                      </div>
                                  </div>
                              </ShowItemNameNewStyle>
                          </>
                      )
                  }
  
                  {
                      succees === true && Object.entries(props?.value).map(([key, value]: any) =>
                          <>
                              <SuccessInfoAfterSubmit key={value.lastModified} style={{ width: `${props.width}` }} className='text-center rounded-lg my-1.5 px-6 py-2.5 h-10 text-xs'>
                                  <div className='item-inner'>
                                      <BsCheck2Circle color='green' size={20} />
                                      <span className='text-sm'>
                                          {t('completed')}
                                      </span>
                                  </div>
                                  <div className='item-name' style={{ color: '#ABABAB' }}>
                                      {value.name}
                                  </div>
                              </SuccessInfoAfterSubmit>
                          </>
                      )
                  }
  
  
  
  
                  <div className={`row-center column my-1.5`} style={{ width: `${props.width}` }}>
                      {/* <button disabled={(Object.entries(props.value).length !== 0 && isIncludedTypeFormat === false && isIncludedSize === false) ? false : true} type='submit' className={`w-full  my-1.5 inline-block px-6 py-2.5 h-10 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-50`}>
                          {loading ? <ClipLoader cssOverride={{ margin: '-5px 0' }} color="#36d7b7" size={30} /> : t('submit')}
                      </button> */}
              {/* {props.isTusProtocol && <button onClick={handleAbort} className='w-full my-1.5 inline-block px-6 py-2.5 h-10 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
                          Pause
                      </button>} */}
            </div>
  
            {isIncludedTypeFormat && (
              <ShowErrorFileUnderButton
                style={{ width: `${props.width}` }}
                className="text-center rounded-lg my-1.5 px-6 py-2.5 h-10 text-xs"
              >
                <MdErrorOutline color="red" size={20} />
                <span className="text-sm">
                  {t("enterTheFileFormatCorrectly")}
                </span>
              </ShowErrorFileUnderButton>
            )}
  
            {isIncludedSize && (
              <ShowErrorFileUnderButton
                style={{ width: `${props.width}` }}
                className="text-center rounded-lg my-1.5 px-6 py-2.5 h-10 text-xs"
              >
                <MdErrorOutline color="red" size={20} />
                <span className="text-sm">
                  {t("pleaseTheMaximumFileSizeIs50MB")}
                </span>
              </ShowErrorFileUnderButton>
            )}
          </FormStyled>
        </>
      );
    }
  );
  export default UploadFile;
  
  UploadFile.defaultProps = {
    multiple: false,
    disabled: false,
    isTusProtocol: true,
    style: {},
    width: "100%",
    height: "600px",
    maximumSize: 1024 * 50000,
  };
  