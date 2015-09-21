<?php
/**
 * Created by IntelliJ IDEA.
 * User: rsmirnou
 * Date: 6/26/2015
 * Time: 1:23 PM
 */
require_once 'db/IDB.php';
require_once 'db/DB.php';
require_once 'db/Manager.php';
require_once 'db/IEngine.php';
require_once 'db/Engine.php';
require_once 'db/engine/MySQL.php';

$manager = new DB_Manager("", "MySQL");
$manager->setCredentials('localhost', 'root', 'admin', 'latticepro');
DB::init($manager);
$tables = DB::getColumn("SHOW TABLES from latticepro" );
set_time_limit(0);






$encodeStr = '{"ppxray_upload_fileinfo":["filename"],"ppxray_adjustment_code":["code_name","code_type","description"],"ppxray_application_master":["app_name","app_id","group_name","icon_class","img_url"],"ppxray_application_master_org":["app_name","app_id","group_name","icon_class","img_url"],"ppxray_billing_notes":["notes"],"ppxray_bodyarea":["body_area"],"ppxray_bonesonometer":["bone_sonometer","serial_no","description","file_path"],"ppxray_calllog":["contact_person","phone_no","reason","remarks"],"ppxray_calltype":["calltype"],"ppxray_computer":["serial_no","model","mark","computer","mac_id","description"],"ppxray_corporate_address":["address","address2","city","state","phone","email","website","country","fax","contact_firstname","contact_lastname","contact_middlename","alternate_phone","alternate_email","contact_title"],"ppxray_corporate_cptcode":["cpt_code","cpt_description","Description","modifier_code"],"ppxray_corporate_docs":["docname"],"ppxray_corporategroup":["group_nm","group_desc","address","address2","city","state","phone","email","website","country","fax","contact_firstname","contact_lastname","contact_middlename","alternate_phone","alternate_email","contact_title"],"ppxray_cptcode":["cpt_code","cpt_description","cpt_common","average_free","personal_code"],"ppxray_device":["unique_id","device_name","image_path","description","comments"],"ppxray_directnumber":["telephone","phdesc"],"ppxray_ekg":["unique_id","device_name","image_path","description","comments"],"ppxray_email_deamon":["rec_email","subject","msg_body","file_nm"],"ppxray_email_template":["template_code","template_name","subject","body","notations"],"ppxray_equipment":["full_lead","half_lead","thyroid_shield"],"ppxray_equipment_docs":["docname","description"],"ppxray_equipment_maintenance":["equipment_type","notes"],"ppxray_equipment_service":["reason"],"ppxray_facility":["facility_nm","facility_alias_nm","address1","address2","city","state","country","phone","fax","nursing_nm","nursing_email","admin_nm","admin_email","website","bill_contactnm","bill_phone","bill_email","bill_addres1","bill_addres2","bill_city","bill_state","bill_fax","facility_npi","comment_facility","comment_billing","comment_corporation","comment_contact"],"ppxray_facility_cptcode":["cpt_code","cpt_description","modifier_code"],"ppxray_facility_docs":["docname","description"],"ppxray_facility_floor":["floorname","floor_fax","floor_phone","floor_email","floor_comment"],"ppxray_facilityinvoice_notes":["notes"],"ppxray_facilityowner":["corporation_name","billing_address","first_name","middle_name","last_name","address1","address2","city","state","zipcode","phone","fax","email","con_title","contact_name","contact_nm","comments"],"ppxray_filelog":["file_name","file_size","path","action","description"],"ppxray_folder_byuser":["folder_name","reason"],"ppxray_generator":["generator_slno","name","image_path"],"ppxray_glove":["glove_number","description"],"ppxray_groupmanager":["group_nm","group_desc"],"ppxray_groupmembers":["member_type"],"ppxray_hospice":["hospice_nm","address1","address2","city","state","first_name","last_name","phone","fax"],"ppxray_icd9code":["icd_code","short_description","personal_code","common","shorter_description","description"],"ppxray_importitem":["item_name","item_subject","comments","file_name","file_path","description","prov_sign"],"ppxray_lead":["lead_name","unique_id","image_id","image_name","image_path","lead_desc","lead_command"],"ppxray_location":["location"],"ppxray_login_period":["period_type"],"ppxray_message":["subject","message"],"ppxray_messagedetail":["receive_type","priority"],"ppxray_modifier":["modifier_code","modifier_desc","comments"],"ppxray_mv_address":["address_1","address_2","city_id","state_id","zip_id","phone","fax","mobile","email","modul_typ"],"ppxray_mv_archiveday":["description"],"ppxray_mv_assignedradiologygroups":["group_nm","group_desc","address","city","state","zipcode"],"ppxray_mv_company":["company_nm","company_desc"],"ppxray_mv_designation":["designation","designation_desc"],"ppxray_mv_examtype":["exam_type_nm","exam_type_desc"],"ppxray_mv_facilitytype":["facilitytype","facilitytype_desc"],"ppxray_mv_feeschedule":["schedule_nm","schedule_desc"],"ppxray_mv_group":["group_nm","group_desc"],"ppxray_mv_idtf_provider_qualifier":["idtfproviderqualifier_nm","idtfproviderqualifier_desc"],"ppxray_mv_idtf_rendering_options":["idtfrenderingoption_nm","idtfrenderingoption_desc"],"ppxray_mv_importitemtype":["type_name","comments"],"ppxray_mv_interpretinggroup":["interpreting_group_nm","interpreting_group_desc"],"ppxray_mv_interpretingphysician":["interpreting_physician_nm","interpreting_physician_desc"],"ppxray_mv_loginattempts":["comments"],"ppxray_mv_modality":["modality_nm","modality_desc"],"ppxray_mv_orderstatus":["orderstatus_nm","orderstatus_desc"],"ppxray_mv_ordertype":["ordertype_name"],"ppxray_mv_password":["password"],"ppxray_mv_password_strength":["min_character","no_password_reuse"],"ppxray_mv_payerytype":["payortype_nm","payor_desc"],"ppxray_mv_pos":["pos_code","pos","pos_desc"],"ppxray_mv_pps":["pps_nm","pps_desc"],"ppxray_mv_priority":["priority_nm","priority_desc"],"ppxray_mv_provider_qualifier":["providerqualifier_nm","providerqualifier_desc"],"ppxray_mv_questype":["questnm"],"ppxray_mv_radiologygroup":["radiology_group_nm","radiology_group_desc","tax_id","address","address2","city","state"],"ppxray_mv_relationship":["relation_type_nm","relation_type_desc"],"ppxray_mv_rendering_options":["renderingoption_nm","renderingoption_desc"],"ppxray_mv_setup_q0092":["code"],"ppxray_mv_state":["state_nm","state_desc"],"ppxray_mv_taxonomycode":["code_no","code_desc"],"ppxray_mv_termsconditions":["terms_cndns"],"ppxray_mv_transportation":["code","modifier_id"],"ppxray_mv_usertype":["usertype_name","user_table","usertype_desc"],"ppxray_order":["physician_type","room","cptdesc","icddesc","phoneresult","faxresult","comment","exam_symptoms","patient_diff_address","patient_diff_state","patient_diff_city","patient_diff_phone","cancel_reason","cancel_reason_val","spoke_with"],"ppxray_order_auditlog":["action","action_byname"],"ppxray_order_comment":["comment"],"ppxray_order_correctional":["correctional_type","ice_number","inmate_number","immigration_id"],"ppxray_order_final_cpt":["cpt_code_val","cpt_desc","icd_code"],"ppxray_order_images":["img_path"],"ppxray_order_initial_cpt":["cpt_code_val","cpt_desc"],"ppxray_order_notes":["notes"],"ppxray_order_occupation":["person","phone","company","comp_add","department","location","reason","special_inst"],"ppxray_order_payment":["cpt_code","cpt_desc","pay_desc"],"ppxray_order_reportfax":["fax_number","comment"],"ppxray_order_reportphone":["phone_number","comment"],"ppxray_order_request":["request_by","first_name","last_name","phone","fax","email"],"ppxray_order_result":["result","file_name","description","file_path"],"ppxray_orderdetail":["order_source","first_name","last_name","title","face_sheet","telephone","email","other_value"],"ppxray_orderflow":["status"],"ppxray_organization":["organisation_nm","address1","address2","city","state","country","phone","fax","email","contact","bill_addres1","bill_addres2","bill_city","bill_state","bill_country"],"ppxray_other_equipment":["serial_no","device_name","file_path","description"],"ppxray_patient_guarantor":["g_fnm","g_mid","g_lnm","g_address1","g_address2","g_ssn","g_city","g_state","g_zip","g_dob","g_phone","g_wphone","g_mob","g_fax","gaddr_lastname","gaddr_firstname"],"ppxray_patient_payor":["insurance_no","insured_fnm","insured_mnm","insured_lnm","insured_address1","insured_address2","insured_city","insured_state","insured_zipcode","insured_phone","insured_mob","insured_fax","insured_dt","insured_orgname"],"ppxray_patient_provider":["referral_providernm","referral_providercode","referral_npi"],"ppxray_patient_sms":["message"],"ppxray_patientinfo":["first_name","middle_name","last_name","last_nickname","first_nickname","ssn","copay","work_phone","org_name","emergency_name","spouse_name","room","yearly_deductible_paid","patient_status","patient_img_path"],"ppxray_payer_address":["contact_nm","address_1","address_2","city","state","zipcode","phone","fax","mobile","email","country","website"],"ppxray_payor_plan_details":["plan_name","comments"],"ppxray_payorinfo":["plan_name","name","group_no","notes","address1","address2","city","state","zipcode","phone","filepath","filenm","payor_code"],"ppxray_phone":["phone_no","phone_desc"],"ppxray_phy_unsignedemail":["sec_email"],"ppxray_prefix":["prefix_nm","prefix_desc"],"ppxray_probe":["probe","model_no","serial_no","description","file_path"],"ppxray_provider_licenseno":["state_license_no"],"ppxray_providerinfo":["first_name","middle_name","last_name","dea","state_license_nos","office_address","officecity","officestate","officezipcode","home_address","homecity","homestate","homezipcode","email","website","work_phone","home_phone","emergency_name","emergency_phone","spouse_name","cell","fax","provider_level","supervisor","upin","ein_name","ein","clia_number","provider_img","npi","referring_nos","provider_sig_path"],"ppxray_radiologist":["first_name","middle_name","last_name","home_address","home_city","home_state","home_zipcode","office_address","office_city","office_state","office_zipcode","work_phone","home_phone","mobile","fax","email","emergency_name","emergency_phone","spouse_name","radio_npi","comments","img_path","sig_path"],"ppxray_radiologist_licenseno":["state_license_no"],"ppxray_radiologygroup_docs":["docname","description"],"ppxray_referprovider":["referring_nos","first_name","middle_name","last_name","home_address","home_city","home_state","home_zipcode","office_address","office_city","office_state","office_zipcode","work_phone","home_phone","mobile","fax","email","emergency_name","emergency_phone","spouse_name","ref_npi","comments","refer_img_path","refer_sig_path"],"ppxray_region":["region"],"ppxray_reminder":["username","usertype","subject","description"],"ppxray_service":["service_name"],"ppxray_specialty":["specialty_name","texonomy_code"],"ppxray_staffinfo":["first_name","middle_name","last_name","ssn","homeaddress","homecity","homestate","homezipcode","officeaddress","officecity","officestate","officezipcode","homephone","work_phone","mobile","fax","email","emergency_name","emergency_phone","spouse_name","staff_image_path","sign_path"],"ppxray_state":["state"],"ppxray_state_cptcode":["cpt_code","cpt_description","modifier_code"],"ppxray_suffix":["suffix_nm","suffix_desc"],"ppxray_techvist_info":["visit","transportation","patient_proc","views","assited_by","clinic_notes","chat_notes"],"ppxray_template":["template"],"ppxray_thyroid":["thyroid_name","thyroid_number","description"],"ppxray_time_sheet":["day","other","pto_other","daily_notes","weekly_notes"],"ppxray_transcription":["cpt_code","interpretation","conclusion","doc_nm","doc_path","cpt_desc"],"ppxray_ultrasoundgroup":["probe_id"],"ppxray_userinfo":["session_id","user_name","user_pass","user_email","linked_url","comment","unlock_duration","quest_ans","quest1_ans","user_title"],"ppxray_vehicle":["vehicle_name","reg_number","vehicle_model","color","description","image_path"],"ppxray_vehicle_notification":["notify_label"],"ppxray_xray":["unique_id","device_name","image_path","description","comments"],"ppxray_xray_plates":["plate_name","unique_id","file_path","center_id"],"ppxray_faxphone":["fax","phone"],"ppxray_fax_deamon":["receiver_name","receiver_email","receiver_faxnumber","subject","message"],"ppxray_admininfo":["company_name","email","logo_name","billingemail","address","billingaddress"],"ppxray_orderclaim":["address","city","state"]}';
$obj = json_decode($encodeStr, true);
foreach($obj as $table => $fields) {
    $query = "update ".$table." set ";
    $updateFields = array();
    try{
       // $ids = DB::query("select refid from $table");

        foreach($fields as $field) {
            $updateFields[] = $field."=aes_decrypt(".$field.", '6e3b4165386d61752c31696f7e') ";
        }
        DB::query($query.implode(" AND ", $updateFields));
    } catch (Exception $e){

    }
}
exit;









foreach($tables as $table) {
    if($_POST['method'] == 'searchColumn') {
        $cols = DB::getColumns($table);
        $found = false;
        foreach($cols as $col) {
            if(strpos(strtolower($col['Field']), strtolower($_POST['value'])) !== false) {
                $found = true;
                echo $table . "::" . $col['Field'] . "\n";
            }
        }
        if(!$found) {
            if(strpos(strtolower($table), strtolower($_POST['value'])) !== false) {
                echo $table . "\n";
            }
        }
    }elseif($_POST['method'] == 'searchValue') {
        $cols = DB::getColumns($table);
        foreach($cols as $col) {
            $c = $col['Field'];
            //$query = "SELECT count(1) FROM ".$table." WHERE BINARY ".$c."=aes_encrypt('".addslashes($_POST['value'])."', '6e3b4165386d61752c31696f7e')";
            $query = "SELECT count(1) FROM ".$table." WHERE ".$c."='".addslashes($_POST['value'])."'";
            $res = DB::getCell($query);
            if(!empty($res)) {
                echo "select aes_decrypt(".$c.", '6e3b4165386d61752c31696f7e'), ".$c." from ".$table . "/* look column: " . $c . "*/\n";
                flush();
            }
        }
    }
}
