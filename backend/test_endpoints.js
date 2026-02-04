const API_URL = 'http://localhost:5000/api/words';

async function testEndpoints() {
    try {
        console.log('Testing POST /api/words...');
        const newWord = {
            word: 'Ephemeral',
            type: 'adjective',
            meaning: 'Lasting for a very short time',
            example: 'Fashions are ephemeral, changing with every season.'
        };
        const postResponse = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newWord)
        });
        
        if (!postResponse.ok) {
            const errorText = await postResponse.text();
            throw new Error(`POST failed: ${postResponse.status} ${errorText}`);
        }
        
        const postData = await postResponse.json();
        console.log('POST Success:', postData);
        const createdId = postData._id;

        console.log('\nTesting GET /api/words...');
        const getResponse = await fetch(API_URL);
        if (!getResponse.ok) {
             throw new Error(`GET failed: ${getResponse.status}`);
        }
        const getData = await getResponse.json();
        console.log('GET Success. Count:', getData.length);
        const found = getData.find(w => w._id === createdId);
        if (found) {
            console.log('Created word found in list.');
        } else {
            console.error('Created word NOT found in list!');
        }

        console.log('\nTesting DELETE /api/words/:id...');
        const deleteResponse = await fetch(`${API_URL}/${createdId}`, {
            method: 'DELETE'
        });
         if (!deleteResponse.ok) {
             throw new Error(`DELETE failed: ${deleteResponse.status}`);
        }
        const deleteData = await deleteResponse.json();
        console.log('DELETE Success:', deleteData);

    } catch (error) {
        console.error('Test Failed:', error.message);
        process.exit(1);
    }
}

testEndpoints();

