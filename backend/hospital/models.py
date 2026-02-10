from datetime import datetime
from sqlite3 import Date
from django.db import models
from django.forms import ValidationError
from django.utils import timezone

# Create your models here.
class WareHouse(models.Model):
    wh_name = models.CharField(max_length=63)
    def __str__(self):
        return f"{self.wh_name}"

class Note(models.Model):
    note = models.CharField(max_length=255, verbose_name="Note")
    date = models.DateField(verbose_name="Date")
    start_clock = models.TimeField(verbose_name="Start Time")
    finish_clock = models.TimeField(verbose_name="Finish Time")
    
    def __str__(self):
            return f"{self.note} on {self.date}"
    
    class Meta:
        ordering = ['date', 'start_clock']
        verbose_name = "Not"
        verbose_name_plural = "Notlar"
        indexes = [
            models.Index(fields=['date']),
        ]

    def clean(self):
        if self.finish_clock <= self.start_clock:
            raise ValidationError("Bitiş saati, başlangıç saatinden sonra olmalıdır.")
 
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

class PatientCard(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="created_date")
    patient_number = models.CharField(max_length=50, blank=True, null=True)
    national_id = models.CharField(max_length=11, blank=True, null=True)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    patient_image = models.FileField(upload_to='images/patient_images/', blank=True, null=True)
    place_of_birth = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    nationality = models.CharField(max_length=100, blank=True, null=True)
    mother_name = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    patient_type = models.CharField(max_length=50, blank=True, null=True)
    is_stranger = models.BooleanField(default=False)
    insurance_info = models.CharField(max_length=40, blank=True, null=True)
    instagram_username = models.CharField(max_length=200, blank=True, null=True)  
    mobile_phone1 = models.CharField(max_length=20, blank=True, null=True)
    mobile_phone2 = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    seans_number = models.IntegerField(blank=True, null=True)
    device_name = models.CharField(max_length=255, blank=True, null=True)
    seans_days = models.CharField(max_length=255, blank=True, null=True)
    education_status = models.CharField(max_length=20,blank=True, null=True)
    occupation = models.CharField(max_length=100,blank=True, null=True)
    current_employer = models.CharField(max_length=100,blank=True, null=True)
    marital_status = models.CharField(max_length=10,blank=True, null=True)
    children_count = models.PositiveIntegerField(blank=True, null=True)
    referee = models.CharField(max_length=100,blank=True, null=True)
    institution_type = models.CharField(max_length=10,blank=True, null=True)
    applied_department = models.CharField(max_length=100,blank=True, null=True)
    applied_operation = models.CharField(max_length=100,blank=True, null=True)
    complaints = models.TextField(blank=True, null=True)
    medications = models.TextField(blank=True, null=True)  # Sürekli kullanılan ilaçlar
    existing_conditions = models.TextField(blank=True, null=True)  # Mevcut hastalıklar
    smoker = models.BooleanField(default=False)  # Sigara kullanımı
    past_surgeries = models.TextField(blank=True, null=True)  # Geçmiş operasyonlar
    allergies = models.TextField(blank=True, null=True)  # Alerjiler
    post_surgery_address = models.CharField(max_length=255, blank=True, null=True)  # Ameliyat sonrası kalınacak adres
    patient_part = models.CharField(max_length=100, blank=True, null=True, verbose_name="hasta bolumu")
    check_worker = models.CharField(max_length=100, blank=True, null=True, verbose_name="Onaylayan Doktor")#onaylayan doktor
    start_worker = models.CharField(max_length=100, blank=True, null=True, verbose_name="Kayıt Acan")#
    relevant_worker = models.CharField(max_length=100, blank=True, null=True, verbose_name="ilgilenen doktor")#

    discharge_date = models.DateTimeField(null=True, blank=True, verbose_name="Discharge Date")
    sharing_permission = models.BooleanField(default=False, verbose_name="Sharing Permission")    
    registration_date = models.DateTimeField( blank=True, null=True, verbose_name="Registration Date")

    flight_date = models.DateTimeField(blank=True, null=True,verbose_name="Flight Date")
    stayed_hotel = models.CharField(max_length=100, blank=True, null=True, verbose_name="Kaldığı Otel")#
    tour_operator = models.CharField(max_length=100, blank=True, null=True, verbose_name="Tur operatoru")#
    session_time = models.CharField(max_length=29, blank=True, null=True, verbose_name="Seans Saati")#
    session_date = models.DateField(blank=True, null=True, verbose_name="Seans Tarihi")

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.national_id})"

    class Meta:
        verbose_name = "Patient Card"
        verbose_name_plural = "Patient Cards"
        ordering = ['last_name', 'first_name']

class PatientNote(models.Model):
    # Patient Information
    patient = models.ForeignKey(PatientCard, on_delete=models.CASCADE, related_name='patient_note')
    note_type = models.CharField(null=True, blank=True, max_length=15)

    # Surgeries
    upcoming_surgeries = models.TextField(null=True, blank=True, verbose_name="Upcoming Surgeries")
    past_surgeries = models.TextField(null=True, blank=True, verbose_name="Past Surgeries")

    # Doctor Notes
    doctor_notes = models.TextField(null=True, blank=True, verbose_name="Doctor Notes")
    consultation_date = models.DateTimeField(null=True, blank=True, auto_now_add=True, verbose_name="consultation_date")
    surgery_date = models.CharField(null=True, blank=True, max_length=63)
    control_1_date = models.CharField(null=True, blank=True, max_length=63)
    control_2_date = models.CharField(null=True, blank=True, max_length=63)
    # Type: diş
    number_11 = models.BooleanField(default=False, verbose_name="11")
    number_12 = models.BooleanField(default=False, verbose_name="12")
    number_13 = models.BooleanField(default=False, verbose_name="13")
    number_14 = models.BooleanField(default=False, verbose_name="14")
    number_15 = models.BooleanField(default=False, verbose_name="15")
    number_16 = models.BooleanField(default=False, verbose_name="16")
    number_17 = models.BooleanField(default=False, verbose_name="17")
    number_18 = models.BooleanField(default=False, verbose_name="18")
    number_21 = models.BooleanField(default=False, verbose_name="21")
    number_22 = models.BooleanField(default=False, verbose_name="22")
    number_23 = models.BooleanField(default=False, verbose_name="23")
    number_24 = models.BooleanField(default=False, verbose_name="24")
    number_25 = models.BooleanField(default=False, verbose_name="25")
    number_26 = models.BooleanField(default=False, verbose_name="26")
    number_27 = models.BooleanField(default=False, verbose_name="27")
    number_28 = models.BooleanField(default=False, verbose_name="28")
    number_31 = models.BooleanField(default=False, verbose_name="31")
    number_32 = models.BooleanField(default=False, verbose_name="32")
    number_33 = models.BooleanField(default=False, verbose_name="33")
    number_34 = models.BooleanField(default=False, verbose_name="34")
    number_35 = models.BooleanField(default=False, verbose_name="35")
    number_36 = models.BooleanField(default=False, verbose_name="36")
    number_37 = models.BooleanField(default=False, verbose_name="37")
    number_38 = models.BooleanField(default=False, verbose_name="38")
    number_41 = models.BooleanField(default=False, verbose_name="41")
    number_42 = models.BooleanField(default=False, verbose_name="42")
    number_43 = models.BooleanField(default=False, verbose_name="43")
    number_44 = models.BooleanField(default=False, verbose_name="44")
    number_45 = models.BooleanField(default=False, verbose_name="45")
    number_46 = models.BooleanField(default=False, verbose_name="46")
    number_47 = models.BooleanField(default=False, verbose_name="47")
    number_48 = models.BooleanField(default=False, verbose_name="48")
    
    # Type: plastik

    forehead = models.BooleanField(default=False)
    right_temple = models.BooleanField(default=False)
    left_temple = models.BooleanField(default=False)
    nose = models.BooleanField(default=False)
    right_ear = models.BooleanField(default=False)
    left_ear = models.BooleanField(default=False)
    upper_lip = models.BooleanField(default=False)
    lower_lip = models.BooleanField(default=False)
    right_cheek = models.BooleanField(default=False)
    left_cheek = models.BooleanField(default=False)
    chin = models.BooleanField(default=False)
    neck = models.BooleanField(default=False)
    right_under_eye = models.BooleanField(default=False)
    left_under_eye = models.BooleanField(default=False)
    right_eyebrow = models.BooleanField(default=False)
    left_eyebrow = models.BooleanField(default=False)
    right_leg = models.BooleanField(default=False)
    left_leg = models.BooleanField(default=False)
    right_arm = models.BooleanField(default=False)
    left_arm = models.BooleanField(default=False)
    right_breast = models.BooleanField(default=False)
    left_breast = models.BooleanField(default=False)
    right_hip = models.BooleanField(default=False)
    left_hip = models.BooleanField(default=False)
    abdomen = models.BooleanField(default=False)
    back = models.BooleanField(default=False)

    # Type: Saç
    first_application_date = models.DateField(null=True, blank=True, verbose_name="İlk Müracaat Tarihi")
    planned_procedure_date = models.DateField(null=True, blank=True, verbose_name="Uygulanacak Tarih")

    # Hasta bilgileri
    diagnosis = models.CharField(null=True, blank=True, max_length=255, verbose_name="Hasta Tanısı")
    previous_transplant = models.BooleanField(default=False, verbose_name="Daha Önce Saç Ekimi Yapıldı mı?")
    session_number = models.PositiveIntegerField(null=True, blank=True, verbose_name="Kaçıncı Seans")

    # İşlem bilgileri
    method = models.CharField(null=True, blank=True, max_length=255, verbose_name="Uygulanacak Metod")
    graft_count = models.PositiveIntegerField(null=True, blank=True, verbose_name="Kök Sayısı")
    protocol_number = models.CharField(null=True, blank=True, max_length=50, verbose_name="Protokol No")

    # Kellik seviyesi (Erkek)
    bold_type = models.CharField(null=True, blank=True, max_length=50, verbose_name="Kellik seviyesi")


    def __str__(self):
        return f"{self.patient.first_name} - {self.id}"

class Stock(models.Model):
    stock_name = models.CharField(max_length=100, blank=True, null=True)
    stock_buyed = models.IntegerField(default=0, blank=True, null=True)
    stock_haved = models.IntegerField(default=0, blank=True, null=True)
    stock_ut = models.DateField(blank=True, null=True)
    stock_skt = models.DateField(blank=True, null=True)
    stock_warehouse = models.ForeignKey(WareHouse, on_delete=models.SET_NULL, blank=True, null=True, related_name="wh_stocks")
    stock_pozition = models.CharField(max_length=100, blank=True, null=True)
    stcok_group = models.CharField(max_length=100, blank=True, null=True)
    def __str__(self):
        return f"{self.stock_name}"
    
class Order(models.Model):
    order_name = models.CharField(max_length=100, blank=True, null=True)
    order_number = models.IntegerField(default=0, blank=True, null=True)
    order_warehouse = models.ForeignKey(WareHouse, on_delete=models.SET_NULL, blank=True, null=True, related_name="wh_orders")
    order_pozition = models.CharField(max_length=100, blank=True, null=True)
    order_group = models.CharField(max_length=100, blank=True, null=True)
    order_startdate = models.DateField(default=timezone.now)
    order_finishdate = models.DateField(blank=True, null=True)
    order_stuation= models.CharField(max_length=31, blank=True, null=True)
    def __str__(self):
        return f"{self.order_name}"

class CommunicationCard(models.Model):
    patient = models.OneToOneField(PatientCard, on_delete=models.CASCADE, related_name='communication_card')
    address_type = models.CharField(max_length=100, blank=True, null=True)
    external_door_no = models.CharField(max_length=10, blank=True, null=True)
    internal_door_no = models.CharField(max_length=10, blank=True, null=True)
    district = models.CharField(max_length=100, blank=True, null=True)
    subdistrict = models.CharField(max_length=100, blank=True, null=True)
    village = models.CharField(max_length=100, blank=True, null=True)
    neighborhood = models.CharField(max_length=100, blank=True, null=True)
    street = models.CharField(max_length=100, blank=True, null=True)
    home_phone = models.CharField(max_length=20, blank=True, null=True)
    work_phone = models.CharField(max_length=20, blank=True, null=True)
    fax = models.CharField(max_length=20, blank=True, null=True)
    heard_about_us = models.CharField(max_length=255, blank=True, null=True)
    card_issued = models.BooleanField(default=False)
    want_to_be_informed_by_email = models.BooleanField(default=False)
    want_to_be_informed_by_sms = models.BooleanField(default=False)
    want_to_be_informed_by_phone = models.BooleanField(default=False)
    want_to_be_informed_by_post = models.BooleanField(default=False)

    def __str__(self):
        return f"Communication Card for {self.patient.first_name} {self.patient.last_name}"

    class Meta:
        verbose_name = "Communication Card"
        verbose_name_plural = "Communication Cards"

class PopulationCard(models.Model):
    patient = models.OneToOneField(PatientCard, on_delete=models.CASCADE, related_name='population_card')
    wallet_number = models.CharField(max_length=50, blank=True, null=True)
    marital_status = models.CharField(max_length=50, blank=True, null=True)
    id_type = models.CharField(max_length=50, blank=True, null=True)
    passport_number = models.CharField(max_length=50, blank=True, null=True)
    mother_national_id = models.CharField(max_length=11, blank=True, null=True)
    father_national_id = models.CharField(max_length=11, blank=True, null=True)
    declaration = models.CharField(max_length=50, blank=True, null=True)
    blood_type = models.CharField(max_length=10, blank=True, null=True)
    registry_type = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    district = models.CharField(max_length=100, blank=True, null=True)
    neighborhood = models.CharField(max_length=100, blank=True, null=True)
    volume_number = models.CharField(max_length=50, blank=True, null=True)
    family_serial_number = models.CharField(max_length=50, blank=True, null=True)
    serial_number = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"Population Card for {self.patient.first_name} {self.patient.last_name}"

    class Meta:
        verbose_name = "Population Card"
        verbose_name_plural = "Population Cards"
    
class Worker(models.Model):

    # Basic information
    worker_image = models.ImageField(blank=True, null=True, upload_to='images/worker_images/') 
    first_name = models.CharField(max_length=100,blank=True, null=True, verbose_name="İsim")  # İsim
    last_name = models.CharField(max_length=100,blank=True, null=True, verbose_name="Soyisim")  # Soyisim
    department = models.CharField(max_length=200,blank=True, null=True, verbose_name="Bölüm")  # Bölüm
    personnel_type = models.CharField(max_length=100,blank=True, null=True, verbose_name="Personel Tipi")  # Personel tipi
    doctor_type = models.CharField(max_length=100,blank=True, null=True, verbose_name="Doktor Tipi")  # Doktor tipi
    unit = models.CharField(max_length=100,blank=True, null=True, verbose_name="Ünite")  # Ünite
    daily_work = models.PositiveIntegerField(blank=True, null=True, verbose_name="Günlük Çalışma")  # Günlük çalışma (saat)
    specialty_field = models.CharField(blank=True, null=True, max_length=200, verbose_name="Uzmanlık Dalı")  # Uzmanlık dalı
    specialty_date = models.DateField(blank=True, null=True, verbose_name="Uzmanlık Tarihi")  # Uzmanlık tarihi
    specialty_no = models.CharField(blank=True, null=True, max_length=50, verbose_name="Uzmanlık No")  # Uzmanlık no
    diploma_no = models.CharField(blank=True, null=True, max_length=50, verbose_name="Diploma No")  # Diploma no
    diploma_date = models.DateField(blank=True, null=True, verbose_name="Diploma Tarihi")  # Diploma tarihi
    diploma_registry_no = models.CharField(blank=True, null=True, max_length=50, verbose_name="Diploma Tescil No")  # Diploma tescil no
    duty = models.CharField(blank=True, null=True, max_length=100, verbose_name="Görevi")  # Görevi
    duty_place = models.CharField(blank=True, null=True, max_length=200, verbose_name="Görev Yeri")  # Görev yeri
    supervisor = models.CharField(blank=True, null=True, max_length=100, verbose_name="Sorumlu Kişi")  # Sorumlu kişi
    side_branch = models.CharField(blank=True, null=True, max_length=100, verbose_name="Yan Dal")  # Yan dal
    doctor_facility_code = models.PositiveIntegerField(blank=True, null=True, verbose_name="Doktor Tesis Kodu")  # Doktor tesis kodu
    avg_waiting_time = models.PositiveIntegerField(blank=True, null=True, verbose_name="Ortalama Hasta Bekleme Süresi")  # Ortalama hasta bekleme süresi
    evaluation_group = models.CharField(max_length=100, blank=True, null=True,verbose_name="Değerlendirme Grubu")  # Değerlendirme grubu
    info_note = models.CharField(max_length=100, blank=True, null=True,verbose_name="Bilgi Notu")  # Bilgi Notu
    # Boolean fields
    is_authorized_to_open = models.BooleanField(blank=True, null=True, default=False, verbose_name="Doçentlik Açabilir Mi?")  # is_dofaçabilir
    is_external_doctor = models.BooleanField(blank=True, null=True, default=False, verbose_name="Dış Doktor Mu?")  # is_dısDoktor
    is_intern = models.BooleanField(blank=True, null=True, default=False, verbose_name="Stajyer Mi?")  # is_stajer
    is_company_employee = models.BooleanField(blank=True, null=True, default=False, verbose_name="Firma Elemanı Mı?")  # is_firmaElemanı
    is_disabled_personnel = models.BooleanField(blank=True, null=True, default=False, verbose_name="Özürlü Personel Mi?")  # is_ÖzürlüPersonel
    is_terror_victim = models.BooleanField(blank=True, null=True, default=False, verbose_name="Terör Mağduru Mu?")  # is_TerörMağduru
    is_contract_personnel = models.BooleanField(blank=True, null=True, default=False, verbose_name="Sözleşmeli Personel Mi?")  # is_SözleşmeliPersonel
    is_convict_personnel = models.BooleanField(blank=True, null=True, default=False, verbose_name="Hükümlü Personel Mi?")  # is_HükümlüPersonel
    is_spouse_working = models.BooleanField(blank=True, null=True, default=False, verbose_name="Eşi Çalışıyor Mu?")  # İs_EşiÇalışıyor
    is_retired = models.BooleanField(blank=True, null=True, default=False, verbose_name="Emekli Mi?")  # is_Emekli
    is_temporary_personnel = models.BooleanField(blank=True, null=True, default=False, verbose_name="Geçici Personel Mi?")  # İs_GeçiciPersonel
    is_candidate_officer = models.BooleanField(blank=True, null=True, default=False, verbose_name="Aday Memur Mu?")  # is_AdayMemur
    is_foreign_language_support = models.BooleanField(blank=True, null=True, default=False, verbose_name="Yabancı Dil Yardımı Var Mı?")  # is_yabancı<dil Yardımı
    
    # Other fields
    series_no = models.CharField(blank=True, null=True, max_length=50, verbose_name="Seri Numarası")  # Seri numarası
    national_id = models.CharField(blank=True, null=True,max_length=11, verbose_name="T.C. Kimlik No")  # TC
    birth_date = models.DateField(blank=True, null=True,verbose_name="Doğum Tarihi")  # Doğum tarih
    birth_place = models.CharField(blank=True, null=True,max_length=100, verbose_name="Doğum Yeri")  # Doğum yer
    gender = models.CharField(blank=True, null=True,max_length=10, verbose_name="Cinsiyet")  # Cinsiyet
    marital_status = models.CharField(blank=True, null=True,max_length=20, verbose_name="Medeni Hal")  # Medeni hal
    blood_type = models.CharField(blank=True, null=True,max_length=10, verbose_name="Kan Grubu")  # Kan grubu
    nationality = models.CharField(blank=True, null=True,max_length=50, verbose_name="Uyruğu")  # Uyruğu
    e_invoice_account = models.CharField(blank=True, null=True,max_length=100, verbose_name="E-Fatura Hesabı")  # E-fatura hesabı
    signature = models.CharField(blank=True, null=True,max_length=100, verbose_name="İmza")  # İmza
    country = models.CharField(blank=True, null=True,max_length=100, verbose_name="Ülke")  # Ülke
    city = models.CharField(blank=True, null=True,max_length=100, verbose_name="Şehir")  # Şehir
    district = models.CharField(blank=True, null=True,max_length=100, verbose_name="İlçe")  # İlçe
    disability_rate = models.CharField(blank=True, null=True,max_length=100, verbose_name="Engellilik Oranı")  # Engellilik Oranı
    
    # Contact fields
    phone_1 = models.CharField(blank=True, null=True,max_length=15, verbose_name="Telefon Numarası 1")  # Telno-1
    phone_2 = models.CharField(blank=True, null=True,max_length=15, verbose_name="Telefon Numarası 2")  # Telno-2
    neighborhood = models.CharField(blank=True, null=True,max_length=100, verbose_name="Semt")  # Sempt
    address = models.TextField(blank=True, null=True,verbose_name="Adres")  # Adres
    email = models.EmailField(blank=True, null=True,verbose_name="E-Mail")  # E-Mail
    work_type = models.CharField(blank=True, null=True,max_length=100, verbose_name="Çalışma Tipi")  # Çalışma tipi
    
    # Employment fields
    start_date = models.DateField(blank=True, null=True,verbose_name="İşe Başlangıç Tarihi")  # İşe başlangıç tarihi
    end_date = models.DateField(blank=True, null=True, verbose_name="İşten Ayrılma Tarihi")  # İşten ayrılma tarihi
    previous_workplace = models.CharField(blank=True, null=True,max_length=100, verbose_name="Geldiği Yer")  # Geldiği yer
    next_workplace = models.CharField(blank=True, null=True,max_length=100, verbose_name="Gittiği Yer")  # Gittiği yer
    children_count = models.PositiveIntegerField(blank=True, null=True,verbose_name="Çocuk Sayısı")  # Çocuk sayısı
    education_level = models.CharField(blank=True, null=True,max_length=100, verbose_name="Eğitim Seviyesi")  # Eğitim seviyesi
    retired_date = models.DateField(blank=True, null=True, verbose_name="Emeklilik Tarihi")  # Emeklilik Tarihi
    # Additional information
    registry_no = models.CharField(blank=True, null=True,max_length=50, verbose_name="Sicil No")  # Sicil no
    retired_registry_no = models.CharField(blank=True, null=True,max_length=50, verbose_name="Emekli Sicil No")  # Emekli sicil no
    savings_registry_no = models.CharField(blank=True, null=True,max_length=50, verbose_name="Tasarruf Sicil No")  # Tasarruf sicil no
    tax_office = models.CharField(blank=True, null=True,max_length=100, verbose_name="Vergi Dairesi")  # Vergi dairesi
    tax_no = models.CharField(blank=True, null=True,max_length=50, verbose_name="Vergi No")  # Vergi no
    seniority = models.PositiveIntegerField(blank=True, null=True,verbose_name="Kıdem (Yıl)")  # Kıdem
    seniority_start_date = models.DateField(blank=True, null=True,verbose_name="Kıdem Başlangıç Tarihi")  # Kıdem başlangıç tarihi
    permanence_date = models.DateField(blank=True, null=True,verbose_name="Asalet Tarihi")  # Asalet tarihi
    assignment_date = models.DateField(blank=True, null=True,verbose_name="Atama Tarihi")  # Atama tarihi
    foreign_language = models.CharField(blank=True, null=True,max_length=100, verbose_name="Yabancı Dil")  # Yabancı dil
    
    # Military and union information
    military_status = models.CharField(blank=True, null=True,max_length=50, verbose_name="Askerlik Durumu")  # Askerlik durumu
    military_start_date = models.DateField(blank=True, null=True, verbose_name="Askerlik Başlangıç Tarihi")  # Askerlik başlangıcı tarihi
    military_end_date = models.DateField(blank=True, null=True, verbose_name="Askerlik Bitiş Tarihi")  # Asker bitiş tarihi
    deferment_end_date = models.DateField(blank=True, null=True, verbose_name="Tecil Bitiş Tarihi")  # Tecil biriş tarihi
    union = models.CharField(blank=True, null=True,max_length=100, verbose_name="Sendika")  # Sendika
    union_no = models.CharField(blank=True, null=True,max_length=50, verbose_name="Sendika No")  # Sendika no
    
    # Identity details
    card_no = models.CharField(blank=True, null=True,max_length=50, verbose_name="Cüzdan No")  # Cüzdan no
    mother_name = models.CharField(blank=True, null=True,max_length=100, verbose_name="Ana Adı")  # Ana adı
    father_name = models.CharField(blank=True, null=True,max_length=100, verbose_name="Baba Adı")  # Baba adı
    birth_city = models.CharField(blank=True, null=True,max_length=100, verbose_name="Doğum Şehri")  # Şehir
    birth_district = models.CharField(blank=True, null=True,max_length=100, verbose_name="Doğum İlçesi")  # İlçe
    neighborhood_village = models.CharField(blank=True, null=True,max_length=100, verbose_name="Mahalle")  # Mahalle
    volume_no = models.CharField(blank=True, null=True,max_length=50, verbose_name="Cilt No")  # Cilt no
    family_order_no = models.CharField(blank=True, null=True,max_length=50, verbose_name="Aile Sıra No")  # Aile sıra no
    order_no = models.CharField(blank=True, null=True,max_length=50, verbose_name="Sıra No")  # Sıra no

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class TaskAssignment(models.Model):
    # ForeignKey relationship to Person model
    person = models.ForeignKey(
        Worker, 
        on_delete=models.CASCADE, 
        related_name="task_assignments",
        verbose_name="Çalışan"
    )  # Görev atanacak çalışan

    # Fields for the task assignment
    task_name = models.CharField(max_length=200, blank=True, null=True, verbose_name="Görev Yeri")  # Çalışan görevi
    start_time = models.TimeField(blank=True, null=True, verbose_name="Başlangıç Saati")  # Başlangıç saati
    end_time = models.TimeField(blank=True, null=True, verbose_name="Bitiş Saati")  # Bitiş saati

    def __str__(self):
        return f"{self.task_name} - {self.person.first_name} {self.person.last_name}" if self.task_name else f"{self.person.first_name} {self.person.last_name}"

class TaskCheck(models.Model):
    # ForeignKey relationship to Person model
    task = models.ForeignKey(
        TaskAssignment,
        on_delete=models.CASCADE,
        related_name="task_checks",
    )  # Görev atanacak çalışan

    # Fields for the task assignment
    task_check =models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True, verbose_name="İş Tanımı")  # İş tanımı
    date = models.DateField(default=Date.today, verbose_name="Son Kontrol Tarihi")  # Tarih
    cheked_person = models.CharField(max_length=200, blank=True, null=True, verbose_name="Son Kontrol Eden")  # İş tanımı

    def __str__(self):
        return f"{self.task} - {self.task_check}"

class WorkingHours(models.Model):
    person = models.ForeignKey(
        Worker,
        on_delete=models.CASCADE,
        related_name="working_hours",  # Çalışanın çalışma saatlerine ters ilişki
        verbose_name="Çalışan"
    )
    start_time = models.TimeField(blank=True, null=True, verbose_name="İşbaşı Saati")  # İşbaşı saati
    end_time = models.TimeField(blank=True, null=True, verbose_name="Paydos Saati")  # Paydos saati
    working_days = models.CharField(max_length=200, blank=True, null=True, verbose_name="Çalışma Günleri")  # Çalışma günleri
    weekly_hours = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, verbose_name="Haftalık Çalışma Saati")  # Haftalık çalışma saati
    date = models.DateField(blank=True, null=True, verbose_name="Tarih")  # Çalışma tarihi

    def __str__(self):
        return f"{self.person.first_name} {self.person.last_name} - {self.date}"
    
class Leave(models.Model):
    person = models.ForeignKey(
        Worker,
        on_delete=models.CASCADE,
        related_name="leaves",
        verbose_name="Çalışan"
    )
    start_date = models.DateField(blank=True, null=True, verbose_name="İzin Başlangıç Tarihi")
    end_date = models.DateField(blank=True, null=True, verbose_name="İzin Bitiş Tarihi")
    leave_days = models.PositiveIntegerField(blank=True, null=True, verbose_name="Kullanılan İzin Günleri")


    def __str__(self):
        return f"{self.person.first_name} {self.person.last_name} - {self.leave_days} Gün İzin"

class WorkerFile(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    person = models.ForeignKey(
        Worker,
        on_delete=models.CASCADE,
        related_name="worker_files",
        verbose_name="Çalışan"
    )
    file_name = models.CharField(max_length=60, blank=True, null=True)
    file = models.FileField(blank=True, null=True,upload_to='files/worker_files/')

class PatientPhoto(models.Model):
    person = models.ForeignKey(
        PatientCard,
        on_delete=models.CASCADE,
        related_name="patient_photos",
    )
    file_name = models.CharField(max_length=60, blank=True, null=True)
    file = models.FileField(blank=True, null=True,upload_to='images/patient_photos/')

class PatientFiles(models.Model):
    created_at = models.DateField(auto_now_add=True)

    person = models.ForeignKey(
        PatientCard,
        on_delete=models.CASCADE,
        related_name="patient_files",
    )
    file_name = models.CharField(max_length=60, blank=True, null=True)
    file = models.FileField(blank=True, null=True,upload_to='files/patient_files/')

class Poll(models.Model):
    person = models.ForeignKey(
        PatientCard,
        on_delete=models.CASCADE,
        related_name="patient_poll",
    )
    question1 =models.CharField(max_length=255, blank=True, null=True)
    question2 =models.CharField(max_length=255, blank=True, null=True)
    question3 =models.CharField(max_length=255, blank=True, null=True)
    question4 =models.CharField(max_length=255, blank=True, null=True)    

class UsedStocks(models.Model):
    patient_used = models.ForeignKey(
        PatientCard,
        on_delete=models.CASCADE,
        related_name="patient_uses",
    )
    stock_used = models.ForeignKey(
        Stock,
        on_delete=models.CASCADE,
        related_name="patient_uses",
    )
    number_used = models.PositiveIntegerField(default=1)
    used_at = models.DateTimeField(auto_now_add=True, verbose_name="used_at")
