import * as yup from 'yup'
import {isNationalIdValid} from 'tools/pure-function/nationalCodeIranianChecker'

const validators = {

	firstName: yup.string().matches(/^([a-zA-Z]|[\u0600-\u06FF\s])+$/, 'firstName_matches'),
	lastName: yup.string().matches(/^([a-zA-Z]|[\u0600-\u06FF\s])+$/, 'lastName_matches'),
	phonenumber: yup.string().matches(/^09[0-9]{9}$/, 'phone_number_matches'),
	phoneNumber: yup.string().matches(/^09[0-9]{9}$/, 'phone_number_matches'),
	email: yup.string().email('enter_email_matches'),
	password: yup.string().min(8 , "limit_pass"),
	username: yup.string().matches(/^09[0-9]{9}$/, 'phone_number_matches'),
	coupon: yup.string(),
	name: yup.string().matches(/^([a-zA-Z]|[0-9]|[\u0600-\u06FF\s])+$/, 'coupon_name_matches'),
	code: yup.string().matches(/^([a-zA-Z]|[0-9]|[\u0600-\u06FF\s])+$/, 'coupon_code_matches'),
	expireDate: yup.string().matches(/^([0-10])$/, 'coupon_expiredate_matches'),
	capacity: yup.number().typeError('coupon_capacity_matches'),
	stringData: yup.string().required('addString'),
	stringNotImportant: yup.string(),
    arrayStringdata : yup.array().of(yup.string()),
	array : yup.array(),
	numberData : yup.number().required('coupon_capacity_matches'),
	dateData : yup.date().required('coupon_capacity_matches'),
	amount: yup.number().typeError('coupon_capacity_matches'),
	nationalcode : yup.number().min(10 , 'max_nationalCode')
	
}
export { validators }
