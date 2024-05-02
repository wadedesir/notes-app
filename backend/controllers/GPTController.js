import jwt from 'jsonwebtoken'
import 'express-async-errors'
import { AI_KEY } from '../util/config.js';
import axios from 'axios'

export const noteAssist = async (req, res) => {
// Define the parameters for the completion request
const data = {
  "model": 'gpt-3.5-turbo',
  "messages": [
    {
      "role": "system",
      "content": "You are assiting in writing down notes on a notes app. Answer questions, provide data, etc"
    },
    {
      "role": "user",
      "content": req.body.prompt
    }
  ],
  
};

// Define the headers with your API key
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${AI_KEY}`
};

// Define the URL for the OpenAI Completion API
const url = 'https://api.openai.com/v1/chat/completions';

// Send the POST request to the OpenAI API using Axios
await axios.post(url, data, { headers })
  .then(response => {
    console.log('Completions:', res.json(response.data.choices[0]));
  })
  .catch(error => {
    console.error('Error:', error.response.data);
  });

  // console.log(completion.choices[0]);
}

export const noteEnhance = async (req, res) => {
  // Define the parameters for the completion request
  const data = {
    "model": 'gpt-3.5-turbo',
    "messages": [
      {
        "role": "system",
        "content": "You are looking at user written notes and enhancing them to sound better, enhance then return any text prompt. Do the best you can, don't ask questions"
      },
      {
        "role": "user",
        "content": req.body.prompt
      }
    ],
    
  };
  
  // Define the headers with your API key
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AI_KEY}`
  };
  
  // Define the URL for the OpenAI Completion API
  const url = 'https://api.openai.com/v1/chat/completions';
  
  // Send the POST request to the OpenAI API using Axios
  await axios.post(url, data, { headers })
  .then(response => {
    console.log('Completions:', res.json(response.data.choices[0]));
  })
  .catch(error => {
    console.error('Error:', error.response.data);
  });
  
    // console.log(completion.choices[0]);
  }
