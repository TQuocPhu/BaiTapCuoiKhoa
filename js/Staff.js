class Staff{
    id_staff;
    name_staff;
    age_staff;
    gender_staff;
    phone_staff;
    email_staff;
    address_staff;


    constructor(id_staff, 
        name_staff, age_staff, gender_staff, 
        phone_staff, email_staff, address_staff){

            this.id_staff = id_staff;
            this.name_staff = name_staff;
            this.age_staff = age_staff
            this.gender_staff = gender_staff;
            this.phone_staff = phone_staff;
            this.email_staff = email_staff;
            this.address_staff = address_staff;
    }

    getIdStaff(){
        return this.id_staff;
    }
    getNameStaff(){
        return this.name_staff;
    }

}