const fs = require('fs');
const OpenAI = require('openai');

const openai = new OpenAI({
  baseURL: 'http://localhost:1234/v1',
  apiKey: 'not-needed-for-local'
});

async function chatearConModeloLocal() {
  try {
    const promptUsuario = fs.readFileSync('entrada.txt', 'utf-8');
    console.log(`💬 Enviando prompt: "${promptUsuario}"`);

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'Eres un capitán pirata rudo y hablas como tal. Siempre te quejas del clima.' },
        { role: 'user', content: promptUsuario }
      ],
      model: 'deepseek-r1-distill-qwen-7b',
      temperature: 0.7,
    });

    const respuesta = chatCompletion.choices[0].message.content;
    console.log('\n🤖 Respuesta del modelo:\n');
    console.log(respuesta);

    fs.writeFileSync('salida.txt', respuesta);
    console.log('\n✅ Respuesta guardada en salida.txt');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('👉 Verifica que el servidor de LM Studio esté encendido.');
    }
  }
}

chatearConModeloLocal();
