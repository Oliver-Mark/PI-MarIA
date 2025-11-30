import { collection, writeBatch, getDocs, addDoc, doc, DocumentReference } from 'firebase/firestore';
import { db } from './firebase-config';

// Helper to delete all documents in a collection
const deleteCollection = async (collectionName: string) => {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  if (querySnapshot.empty) {
    console.log(`Collection "${collectionName}" is already empty.`);
    return;
  }
  const batch = writeBatch(db);
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log(`All documents in collection "${collectionName}" have been deleted.`);
};

// Helper to get a random subset of an array
const getRandomSubset = <T>(array: T[], size: number): T[] => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

// --- Mock Data Generation Helpers ---
const generateMockTriage = () => ({
  height: `${(1.5 + Math.random() * 0.4).toFixed(2)} m`,
  bloodPressure: `${Math.floor(110 + Math.random() * 20)}/${Math.floor(70 + Math.random() * 20)} mmHg`,
  priority: ["Normal", "Baixa", "Urgente"][Math.floor(Math.random() * 3)],
  weight: `${Math.floor(50 + Math.random() * 50)} kg`,
  temperature: `${(36.2 + Math.random()).toFixed(1)}°C`,
  hpp: "Paciente relata sintomas diversos, incluindo dor de cabeça e fadiga.",
  observations: "Aguardando avaliação médica. Sinais vitais estáveis."
});

const generateMockConsultations = () => ([
  { id: 1, doctor: "Dr. João Silva", specialty: "Oftalmologia", date: "15/11/2024", isCurrentDoctor: true },
  { id: 2, doctor: "Dra. Maria Santos", specialty: "Cardiologia", date: "10/10/2023", isCurrentDoctor: false },
]);
// --- End of Helpers ---


// Main seeding function
export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    // 1. Clear existing data
    await deleteCollection('patients');
    await deleteCollection('offices');
    await deleteCollection('units');
    await deleteCollection('users');

    // 2. Create Units and Offices
    const unitsToCreate = [
      { name: 'Unidade Centro', address: 'Rua Central, 100', officeCount: 4 },
      { name: 'Unidade Leste', address: 'Avenida Leste, 200', officeCount: 3 },
      { name: 'Unidade Norte', address: 'Alameda Norte, 300', officeCount: 5 },
    ];

    const allOfficeRefs: DocumentReference[] = [];
    const unitIdMap: { [key: string]: string } = {};

    for (const unitData of unitsToCreate) {
      const unitRef = await addDoc(collection(db, 'units'), { name: unitData.name, address: unitData.address });
      unitIdMap[unitData.name] = unitRef.id;
      console.log(`Created Unit: ${unitData.name} with ID: ${unitRef.id}`);

      for (let i = 1; i <= unitData.officeCount; i++) {
        const officeRef = await addDoc(collection(db, 'offices'), {
          name: `Consultório ${i} - ${unitData.name.split(' ')[1]}`,
          unitId: unitRef.id,
        });
        allOfficeRefs.push(officeRef);
      }
      console.log(`- Created ${unitData.officeCount} offices for ${unitData.name}`);
    }
    const allOfficeIds = allOfficeRefs.map(ref => ref.id);
    console.log('Total offices created:', allOfficeIds.length);

    // 3. Create Users
    const usersToCreate = [
        { email: 'teste@maria.health', nome: "Dr. João Pedro (Admin)", permissoes: { acesso_total: true, unidades_ids: [] } },
        { email: 'teste1@gmail.com', nome: "Dr. João Paulo", especialidade: "Oftalmologista", permissoes: { acesso_total: false, unidades_ids: [unitIdMap['Unidade Centro'], unitIdMap['Unidade Norte']] } },
        { email: 'teste2@gmail.com', nome: "Dra. Ana (Residente)", permissoes: { acesso_total: false, unidades_ids: [unitIdMap['Unidade Leste']] } }
    ];

    const userBatch = writeBatch(db);
    for (const userData of usersToCreate) {
        const userRef = doc(db, 'users', userData.email);
        userBatch.set(userRef, userData);
    }
    await userBatch.commit();
    console.log(`Created ${usersToCreate.length} users with permissions.`);


    // 4. Create Patients with Rich Data
    const patientBatch = writeBatch(db);
    const statuses = ['waiting', 'attended', 'scheduled'];
    
    const existingPatients = [
      { name: 'Maria Silva Santos', birthDate: "15/03/1985", cpf: "123.456.789-00" },
      { name: 'João Pedro Oliveira', birthDate: "22/07/1990", cpf: "234.567.890-11" },
      { name: 'Ana Carolina Souza', birthDate: "30/11/1992", cpf: "345.678.901-22" },
      { name: 'Carlos Eduardo Lima', birthDate: "05/02/1988", cpf: "456.789.012-33" },
    ];

    for (const patient of existingPatients) {
      const patientRef = doc(collection(db, 'patients'));
      patientBatch.set(patientRef, { 
        ...patient,
        officeIds: getRandomSubset(allOfficeIds, Math.random() > 0.5 ? 2 : 1),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        insurance: ["Unimed", "Bradesco Saúde", "Particular"][Math.floor(Math.random() * 3)],
        photo: `https://avatar.iran.liara.run/public/${Math.floor(1 + Math.random() * 100)}`,
        triage: generateMockTriage(),
        consultations: generateMockConsultations(),
      });
    }
    console.log('Staged existing patients for creation.');

    const newBrazilianNames = [
      "Gabriel Alves", "Lucas Rocha", "Matheus Santos", "Juliana Pereira", "Beatriz Costa", "Larissa Fernandes", 
      "Gustavo Martins", "Rafael Ferreira", "Vinicius Rodrigues", "Fernanda Lima", "Camila Gomes", "Bruno Carvalho",
      "Diego Azevedo", "Patrícia Ribeiro", "Rodrigo Nogueira"
    ];

    for (const name of newBrazilianNames) {
        const patientRef = doc(collection(db, 'patients'));
        patientBatch.set(patientRef, {
            name: name,
            birthDate: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 40) + 1960}`,
            cpf: `${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 99)}`,
            officeIds: getRandomSubset(allOfficeIds, Math.random() > 0.7 ? 2 : 1),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            insurance: ["Unimed", "Bradesco Saúde", "Amil", "Particular"][Math.floor(Math.random() * 4)],
            photo: `https://avatar.iran.liara.run/public/${Math.floor(1 + Math.random() * 100)}`,
            triage: generateMockTriage(),
            consultations: generateMockConsultations(),
        });
    }
    console.log('Staged 15 new patients for creation.');
    await patientBatch.commit();
    console.log('Committed new patients to the database.');

    // 5. Ensure no office is empty
    const finalUpdateBatch = writeBatch(db);
    const allPatientsSnapshot = await getDocs(collection(db, 'patients'));
    const patientsWithOffices = allPatientsSnapshot.docs.map(doc => doc.data().officeIds).flat();
    
    const emptyOffices = allOfficeIds.filter(id => !patientsWithOffices.includes(id));
    console.log(`${emptyOffices.length} offices are still empty. Assigning patients...`);

    if (emptyOffices.length > 0) {
      const allPatientDocs = allPatientsSnapshot.docs;
      for (const officeId of emptyOffices) {
        const randomPatientDoc = allPatientDocs[Math.floor(Math.random() * allPatientDocs.length)];
        const currentOfficeIds = randomPatientDoc.data().officeIds || [];
        if (!currentOfficeIds.includes(officeId)) {
          finalUpdateBatch.update(randomPatientDoc.ref, { officeIds: [...currentOfficeIds, officeId] });
        }
      }
    }
    
    await finalUpdateBatch.commit();
    console.log('Ensured no office is left empty.');
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
