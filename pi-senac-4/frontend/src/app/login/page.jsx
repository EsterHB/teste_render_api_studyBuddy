'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    senha: '',
  });

  const [signupData, setSignupData] = useState({
    nome: '',
    email: '',
    curso: '',
    semestre: '',
    senha: '',
    confirmarSenha: '',
  });

  const [errors, setErrors] = useState({});

  const API_URL = 'https://teste-render-api-studybuddy.onrender.com/api/users';

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) =>
    password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email obrigatorio';
    else if (!isValidEmail(loginData.email)) newErrors.email = 'Email invalido';
    if (!loginData.senha) newErrors.senha = 'Senha obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.nome) newErrors.nome = 'Nome obrigatorio';
    if (!signupData.email) newErrors.email = 'Email obrigatorio';
    else if (!isValidEmail(signupData.email)) newErrors.email = 'Email invalido';
    if (!signupData.curso) newErrors.curso = 'Curso obrigatorio';
    if (!signupData.semestre) newErrors.semestre = 'Semestre obrigatorio';
    if (!signupData.senha) newErrors.senha = 'Senha obrigatoria';
    else if (!isValidPassword(signupData.senha))
      newErrors.senha = 'Senha deve ter 8+ caracteres, 1 letra e 1 numero';
    if (signupData.senha !== signupData.confirmarSenha)
      newErrors.confirmarSenha = 'As senhas nao coincidem';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) throw new Error('Credenciais inválidas');
      const data = await response.json();
      console.log('Login realizado:', data);
      alert('Login realizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar');
      const data = await response.json();
      console.log('Cadastro realizado:', data);
      alert('Cadastro realizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  };




  const inputClasses = (key) =>
    `w-full p-3.5 border-2 rounded-xl text-gray-800 transition duration-300 focus:outline-none ${
      errors[key]
        ? 'border-red-400 focus:ring-4 focus:ring-red-100'
        : 'border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100'
    }`;

  const tabClasses = (isActive) =>
    `flex-1 py-3 px-5 border-none bg-transparent text-sm font-semibold rounded-lg cursor-pointer transition duration-300 ${
      isActive
        ? 'bg-white text-indigo-500 shadow-md'
        : 'text-gray-500 hover:text-gray-700'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-black to-blue-700">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-3 shadow-lg">
            <span className="text-white text-3xl font-bold">SB</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">StudyBuddy</h1>
          <p className="text-sm text-gray-500">Nunca mais estude sozinho</p>
        </div>

        <div className="flex gap-2.5 mb-7 bg-gray-50 p-1.5 rounded-xl">
          <button onClick={() => { setIsLogin(true); setErrors({}); }} className={tabClasses(isLogin)}>Entrar</button>
          <button onClick={() => { setIsLogin(false); setErrors({}); }} className={tabClasses(!isLogin)}>Cadastrar</button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Email</label>
              <input type="email" placeholder="seu@email.com" value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className={inputClasses('email')} />
              {errors.email && <p className="text-xs text-red-500 mt-[-4px]">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Senha</label>
              <input type="password" placeholder="senha" value={loginData.senha}
                onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
                className={inputClasses('senha')} />
              {errors.senha && <p className="text-xs text-red-500 mt-[-4px]">{errors.senha}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="mt-2 py-3.5 px-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Nome Completo</label>
              <input type="text" placeholder="Seu nome" value={signupData.nome}
                onChange={(e) => setSignupData({ ...signupData, nome: e.target.value })}
                className={inputClasses('nome')} />
              {errors.nome && <p className="text-xs text-red-500 mt-[-4px]">{errors.nome}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Email</label>
              <input type="email" placeholder="seu@email.com" value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                className={inputClasses('email')} />
              {errors.email && <p className="text-xs text-red-500 mt-[-4px]">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-800">Curso</label>
                <input type="text" placeholder="Ex: Medicina" value={signupData.curso}
                  onChange={(e) => setSignupData({ ...signupData, curso: e.target.value })}
                  className={inputClasses('curso')} />
                {errors.curso && <p className="text-xs text-red-500 mt-[-4px]">{errors.curso}</p>}
              </div>

                            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-800">Semestre</label>
                <input type="number" placeholder="1-12" min="1" max="12" value={signupData.semestre}
                  onChange={(e) => setSignupData({ ...signupData, semestre: e.target.value })}
                  className={inputClasses('semestre')} />
                {errors.semestre && <p className="text-xs text-red-500 mt-[-4px]">{errors.semestre}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Senha</label>
              <input type="password" placeholder="senha" value={signupData.senha}
                onChange={(e) => setSignupData({ ...signupData, senha: e.target.value })}
                className={inputClasses('senha')} />
              {errors.senha && <p className="text-xs text-red-500 mt-[-4px]">{errors.senha}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Confirmar Senha</label>
              <input type="password" placeholder="confirmar senha" value={signupData.confirmarSenha}
                onChange={(e) => setSignupData({ ...signupData, confirmarSenha: e.target.value })}
                className={inputClasses('confirmarSenha')} />
              {errors.confirmarSenha && <p className="text-xs text-red-500 mt-[-4px]">{errors.confirmarSenha}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="mt-2 py-3.5 px-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Carregando...' : 'Criar Conta'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
