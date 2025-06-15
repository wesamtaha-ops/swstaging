import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock, Loader, CheckCircle, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function ResetPassword() {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const validatePassword = (pwd: string) => {
        if (pwd.length < 6) {
            return t('reset.passwordTooShort');
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!token) {
            toast.error(t('reset.invalidLink'));
            setIsLoading(false);
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error(t('reset.passwordsDontMatch'));
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('https://backend.votly.co/user/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok && !data.error) {
                setIsSuccess(true);
                toast.success(t('reset.success'));
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                toast.error(data.msg || t('reset.error'));
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            toast.error(t('reset.error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg px-10 py-8 w-full max-w-md text-center">

                <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-4 rounded-full">
                        <Lock className="h-8 w-8 text-blue-600" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('reset.title')}
                </h2>

                {!token && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                        <p className="text-red-800 text-sm">
                            {t('reset.invalidLink')}
                        </p>
                    </div>
                )}

                {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="text-left mb-4">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                {t('reset.newPassword')}
                            </label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={t('reset.newPasswordPlaceholder')}
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {password && password.length < 6 && (
                                <p className="text-red-500 text-xs mt-1">
                                    {t('reset.passwordTooShort')}
                                </p>
                            )}
                        </div>

                        <div className="text-left mb-6">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                {t('reset.confirmPassword')}
                            </label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={t('reset.confirmPasswordPlaceholder')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {t('reset.passwordsDontMatch')}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !token || password !== confirmPassword || password.length < 6}
                            className="w-full py-2 text-white font-medium rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader className="animate-spin mx-auto h-5 w-5" />
                            ) : (
                                t('reset.changePassword')
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {t('reset.successTitle')}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            {t('reset.redirectMessage')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
