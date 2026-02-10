from django.forms import ValidationError
from rest_framework import serializers
from hospital.models import  Note, PatientCard, CommunicationCard, PatientFiles, PatientPhoto, Poll, PopulationCard, Stock, Order, TaskCheck, UsedStocks, WareHouse, Worker, TaskAssignment, Leave, WorkerFile, WorkingHours, PatientNote
from django.db.models import Max, Count
from datetime import datetime


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Kullanıcıya ait bilgileri token'a ekle
        token['name'] = user.first_name
        token['is_admin'] = user.is_superuser  # Kullanıcının admin olup olmadığını ekle
        token['groups'] = [group.name for group in user.groups.all()]  # Kullanıcının dahil olduğu gruplar

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Frontend'in beklediği 'role' bilgisini ekle
        data['role'] = 'admin' if self.user.is_superuser else 'user'
        return data

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

    def create(self, validated_data):
        return Note.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class CommunicationCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationCard
        fields = '__all__'

    def create(self, validated_data):
        return CommunicationCard.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class PatientPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientPhoto
        fields = '__all__'


    def create(self, validated_data):
        """
        Yeni bir izin kaydı oluşturur.
        """
        leave = PatientPhoto.objects.create(**validated_data)
        return leave

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class PatientFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientFiles
        fields = '__all__'


    def create(self, validated_data):
        """
        Yeni bir izin kaydı oluşturur.
        """
        leave = PatientFiles.objects.create(**validated_data)
        return leave

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = '__all__'


    def create(self, validated_data):
        """
        Yeni bir izin kaydı oluşturur.
        """
        leave = Poll.objects.create(**validated_data)
        return leave

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class UsedStocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsedStocks
        fields = '__all__'


    def create(self, validated_data):
        stock = validated_data.get('stock_used')
        number_used = validated_data.get('number_used')

        # Stok yeterliliğini kontrol ediyoruz
        if stock.stock_haved < number_used:
            raise ValidationError({"error": "Yeterli stok yok. Stok miktarı: {}".format(stock.stock_haved)})

        # Stok güncellemesi yapıyoruz
        stock.stock_haved -= number_used
        stock.save()
        
        leave = UsedStocks.objects.create(**validated_data)
        return leave

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class PatientNoteSerializer(serializers.ModelSerializer):
    used_stocks = serializers.SerializerMethodField()

    class Meta:
        model = PatientNote
        fields = '__all__'


    def create(self, validated_data):
     
        return PatientNote.objects.create(**validated_data)
    
    def get_used_stocks(self, obj):
        used_stocks = UsedStocks.objects.filter(patient_used=obj.patient)
        return UsedStocksSerializer(used_stocks, many=True).data
    
    def update(self, instance, validated_data):
        """
        Var olan bir Worker nesnesini güncellemek için özelleştirilmiş metot.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class PatientCardSerializer(serializers.ModelSerializer):
    patient_note = PatientNoteSerializer(many=True, read_only=True)
    patient_poll = PollSerializer(many=True, read_only=True)
    patient_files = PatientFilesSerializer(many=True, read_only=True)
    patient_photos = PatientPhotoSerializer(many=True, read_only=True)

    class Meta:      

        model = PatientCard
        fields = '__all__'

    
    def create(self, validated_data):
        # Yeni PatientCard kaydı oluştur
        instance = PatientCard.objects.create(**validated_data)

        # Bugünün tarihi (gün-ay-yıl formatında)
        today = datetime.now().strftime("%d%m%Y")
        zero = 0
        # PatientCard ID'si ile birleştirerek patient_number oluştur
        if instance.id < 5000:
            random_number = (instance.id*2) + 1
            if random_number < 10:
                new_number = f"{zero}{zero}{zero}{random_number}"
            elif random_number < 100:
                new_number = f"{zero}{zero}{random_number}"
            elif random_number < 1000:
                new_number = f"{zero}{random_number}"
            else:
                new_number = random_number
        
        else:
            random_number = (instance.id*2) + 1
            random_number = random_number%10000
            print(random_number)
            if random_number < 10:
                new_number = f"{zero}{zero}{zero}{random_number}"
                print("10")
            elif random_number < 100:
                new_number = f"{zero}{zero}{random_number}"
                print("100")
            elif random_number < 1000:
                new_number = f"{zero}{random_number}"
                print("1000")
            else:
                new_number = random_number
                print("new_number")
        print(new_number)
        instance.patient_number = f"{today}{new_number}"

        # Güncellenmiş instance'ı kaydet
        instance.save()
        return instance
    def update(self, instance, validated_data):
        """
        Mevcut bir hasta kartını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if representation.get('patient_image') and not representation['patient_image'].startswith('http') and not representation['patient_image'].startswith('/media/'):
            filename = representation['patient_image'].split('/')[-1]
            representation['patient_image'] = f"/media/images/patient_images/{filename}"
        return representation

class PopulationCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopulationCard
        fields = '__all__'

    def create(self, validated_data):
        return PopulationCard.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

    def create(self, validated_data):
        # Yeni Stock kaydı oluştur
        return Stock.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        # Yeni Stock kaydı oluştur
        return Order.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Var olan bir Worker nesnesini güncellemek için özelleştirilmiş metot.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class WorkerFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkerFile
        fields = '__all__'


    def create(self, validated_data):
        """
        Yeni bir izin kaydı oluşturur.
        """
        leave = WorkerFile.objects.create(**validated_data)
        return leave

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class TaskCheckSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TaskCheck
        fields = '__all__'

    def create(self, validated_data):
        """
        Yeni bir Worker nesnesi oluşturmak için özelleştirilmiş metot.
        """
        wh = TaskCheck.objects.create(**validated_data)
        return wh

    def update(self, instance, validated_data):
        """
        Var olan bir Worker nesnesini güncellemek için özelleştirilmiş metot.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class TaskAssignmentSerializer(serializers.ModelSerializer):
    task_checks = serializers.SerializerMethodField()
    class Meta:
        model = TaskAssignment
        fields = '__all__'

    def get_task_checks(self, obj):
        """
        TaskCheck ilişkisini belirli bir alana göre sıralı döndürmek için özelleştirilmiş metot.
        """
        task_checks = obj.task_checks.all().order_by('-date')  # `related_name` ile erişim
        return TaskCheckSerializer(task_checks, many=True).data
    
    def create(self, validated_data):
        """
        Yeni bir görev atama oluşturulurken çalışacak özelleştirilmiş metot.
        """
        # Örnek: Başlangıç saati ile bitiş saati arasındaki farkı kontrol et
        start_time = validated_data.get('start_time')
        end_time = validated_data.get('end_time')

        if start_time and end_time and start_time >= end_time:
            raise serializers.ValidationError("Bitiş saati, başlangıç saatinden önce olamaz.")

        # Yeni bir görev atama oluştur ve kaydet
        task_assignment = TaskAssignment.objects.create(**validated_data)
        return task_assignment

    def update(self, instance, validated_data):
        """
        Mevcut bir görev atamasını güncelleme metodu.
        """
        # Örnek: Başlangıç saati ile bitiş saati arasındaki farkı kontrol et
        start_time = validated_data.get('start_time', instance.start_time)
        end_time = validated_data.get('end_time', instance.end_time)

        if start_time and end_time and start_time >= end_time:
            raise serializers.ValidationError("Bitiş saati, başlangıç saatinden önce olamaz.")

        # Diğer alanları güncelle
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Güncellenmiş nesneyi kaydet
        instance.save()
        return instance

class WorkingHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingHours
        fields = '__all__'

    def create(self, validated_data):
        """
        Yeni bir çalışma saati oluşturulurken çalışacak özelleştirilmiş metot.
        """
        # Haftalık çalışma saati hesaplamak için işbaşı ve paydos saatlerini kontrol et
        start_time = validated_data.get('start_time')
        end_time = validated_data.get('end_time')
        weekly_hours = validated_data.get('weekly_hours')

        if start_time and end_time and weekly_hours==None:
            # Örnek: Haftalık çalışma saati hesaplaması yapılabilir
            weekly_hours = (end_time.hour - start_time.hour) * 5  # Basit bir hesaplama (örneğin günde 8 saat)
            validated_data['weekly_hours'] = weekly_hours

        working_hours = WorkingHours.objects.create(**validated_data)
        return working_hours

    def update(self, instance, validated_data):
        """
        Mevcut çalışma saati kaydını güncelleme metodu.
        """
        # Haftalık çalışma saati güncellemesi
        start_time = validated_data.get('start_time', instance.start_time)
        end_time = validated_data.get('end_time', instance.end_time)

        if start_time and end_time and weekly_hours==None:
            weekly_hours = (end_time.hour - start_time.hour) * 5  # Haftalık saat hesaplama
            validated_data['weekly_hours'] = weekly_hours

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = '__all__'

    def validate(self, data):
        """
        İzin tarihlerini kontrol eder.
        """
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        if start_date and end_date and start_date > end_date:
            raise serializers.ValidationError("İzin bitiş tarihi, başlangıç tarihinden önce olamaz.")

        return data

    def create(self, validated_data):
        """
        Yeni bir izin kaydı oluşturur.
        """
        leave = Leave.objects.create(**validated_data)
        return leave

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class WorkerFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkerFile
        fields = '__all__'


    def create(self, validated_data):
        """
        Yeni bir izin kaydı oluşturur.
        """
        leave = WorkerFile.objects.create(**validated_data)
        return leave

    def update(self, instance, validated_data):
        """
        Mevcut bir izin kaydını günceller.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class WorkerSerializer(serializers.ModelSerializer):
    worker_files = WorkerFileSerializer(many=True, read_only=True)
    working_hours = serializers.SerializerMethodField()
    leaves = serializers.SerializerMethodField()
    task_assignments = serializers.SerializerMethodField()

    class Meta:
        model = Worker
        fields = '__all__'
    
    def get_task_assignments(self, obj):
        """
        TaskCheck ilişkisini belirli bir alana göre sıralı döndürmek için özelleştirilmiş metot.
        """
        task_assignments = obj.task_assignments.all().order_by('end_time')  # `related_name` ile erişim
        return TaskAssignmentSerializer(task_assignments, many=True).data

    def get_working_hours(self, obj):
        """
        Working hours'ı testten başa doğru sıralar (en eski başta).
        """
        working_hours = obj.working_hours.all().order_by('-id')  # 'test_field' yerine sıralama kriterinizi yazın
        return WorkingHoursSerializer(working_hours, many=True).data

    def get_leaves(self, obj):
        """
        Leaves'ı testten başa doğru sıralar (en eski başta).
        """
        leaves = obj.leaves.all().order_by('-start_date')  # start_date'e göre sıralar
        return LeaveSerializer(leaves, many=True).data

    def create(self, validated_data):
        """
        Yeni bir Worker nesnesi oluşturmak için özelleştirilmiş metot.
        """
        worker = Worker.objects.create(**validated_data)
        return worker

    def update(self, instance, validated_data):
        """
        Var olan bir çalışan nesnesini güncellemek için özelleştirilmiş metot.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if representation.get('worker_image') and not representation['worker_image'].startswith('http') and not representation['worker_image'].startswith('/media/'):
            filename = representation['worker_image'].split('/')[-1]
            representation['worker_image'] = f"/media/images/worker_images/{filename}"
        return representation
    
class WareHouseSerializer(serializers.ModelSerializer):
    wh_stocks = StockSerializer(many=True, read_only=True)

    wh_orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = WareHouse
        fields = '__all__'

    def create(self, validated_data):
        """
        Yeni bir Worker nesnesi oluşturmak için özelleştirilmiş metot.
        """
        wh = WareHouse.objects.create(**validated_data)
        return wh

    def update(self, instance, validated_data):
        """
        Var olan bir Worker nesnesini güncellemek için özelleştirilmiş metot.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

