import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as Tabs from '@radix-ui/react-tabs';
import {
  BarChart2,
  Download,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  Target,
  Brain,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  PieChart,
  Plus,
} from 'lucide-react';

import { StatsCards } from './FormResults/StatsCards';
import { ResponseTable } from '@/components/forms/responses/table/ResponseTable';
import { AIAnalysis } from './FormResults/AIAnalysis';
import { AdvancedFilters } from './FormResults/AdvancedFilters';
import { MetricsGrid } from './FormResults/MetricsGrid';
import { DeviceBreakdown } from './FormResults/DeviceBreakdown';
import { GeographicDistribution } from './FormResults/GeographicDistribution';
import { QuestionAnalytics } from './FormResults/QuestionAnalytics';
import { AdvancedAnalytics } from './FormResults/AdvancedAnalytics';
import { EngagementTab } from './FormResults/EngagementTab';
import { CompletionTab } from './FormResults/CompletionTab';
import { DemographicsTab } from './FormResults/DemographicsTab';
import { DropOffTab } from '@/components/forms/responses/table/DropOffTab';
import { ResponseDetailsSlideOver } from '@/components/forms/responses/ResponseDetailsSlideOver';
import type { Response, ResponseDetails } from '@/types';
import SurveyR from './SurveyR';
import axios from 'axios';
import { useTranslation } from 'react-i18next';



interface ResponseDetails {
  surveyId: string;
  responses: Record<string, string | boolean | string[] | object>;
  userEmail: string;
  progress: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}





export default function FormResults() {
  const { t } = useTranslation();
  const { formId } = useParams();
  const [responses, setResponses] = useState<ResponseDetails[]>(dummyResponses);
  const [dateRange, setDateRange] = useState('7d');
  const [responseCount, setResponseCount] = useState(null);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeMetricTab, setActiveMetricTab] = useState('overview');
  const [exportFormat, setExportFormat] = useState<'excel' | 'csv' | 'spss'>(
    'excel',
  );
  const [isPremium] = useState(false);
  const [selectedResponse, setSelectedResponse] =
    useState<ResponseDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);
  const [surveys, setSurveys] = useState<any>(null);
  const handleViewDetails = (response: ResponseDetails) => {
    setSelectedResponse(response);
    setIsDetailsOpen(true);
  };


  const tabs = [
    { id: 'responses', label: t('formResults.responses'), icon: FileText },
    { id: 'completion', label: t('formResults.responses'), icon: Target },
    { id: 'drop-off', label: t('formResults.dropOff'), icon: TrendingUp },
    { id: 'summary', label: t('formResults.summary'), icon: PieChart },
    // { id: 'engagement', label: 'Engagement', icon: Clock },
    // { id: 'demographics', label: 'Demographics', icon: Users },
    { id: 'analytics', label: t('formResults.analytics'), icon: BarChart2 },
  ];

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedResponse(null);
  };

  const { id } = useParams<{ id: string }>();


  useEffect(() => {
    const fetchs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/getsurvey/${id}`
        );
        setSurveys(res.data)

      } catch (err) {
        setError("Failed to load response count");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchs();
    }
  }, [id]);

  useEffect(() => {
    const fetchResponseCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/survey/${id}/response-count`
        );
        setResponseCount(res.data.responseCount);
      } catch (err) {
        setError("Failed to load response count");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResponseCount();
    }
  }, [id]);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/survey/${id}/stats`);
        setStats(res.data);
        console.log(res.data);
      } catch (err) {
        setError("Failed to load survey stats");
      }
    };

    if (id) {
      fetchStats();
    }
  }, [id]);


  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get<ResponseDetails[]>(
          `http://localhost:5050/submit_survey/responses/${id}`
        );
        const data = res.data;

        setResponses(res.data)


      } catch (error) {
        console.error("Error fetching responses:", error);
        setError("Failed to fetch survey responses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [id]);


  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'responses':
        return (
          <
            SurveyR
            //ResponseTable
            responses={responses}
            onViewDetails={handleViewDetails}
          // onView={() => onViewDetails(response)}
          />
        );
      case 'summary':
        return <QuestionAnalytics responses={responses} stats={stats} />;
      // case 'engagement':
      //   return <EngagementTab responses={responses} />;
      case 'completion':
        return <CompletionTab responses={responses} survey={surveys} stats={stats} />;
      case 'drop-off':
        return <DropOffTab responses={responses} />;
      // case 'demographics':
      //   return <DemographicsTab responses={responses} />;
      case 'analytics':
        return (
          <div className='min-h-screen mb-20 bg-gray-50'>
            <AIAnalysis
              responses={responses}
              showAIAnalysis={true}
              setShowAIAnalysis={() => { }}
            />

            <AdvancedAnalytics responses={responses} isPremium={isPremium} />
          </div>
        );

      default:
        return null;
    }
  };
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-5 bg-gray-50">
      {/* Header */}
      <div className=" rounded-t-lg">
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate(-1)}
            className=" mb-5 float-right inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left h-4 w-4 mr-2"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            {t('formResults.back')}
          </button>

          <h1 className="text-2xl   font-bold font-almarai font-almarai  font-almarai  ">{t('formResults.title')}</h1>
          <p className="mt-2 text-lg text-white/90"></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Stats Overview */}
        {/* <StatsCards responses={responses} /> */}
        {/* Statistics Overview */}
        <div className="grid grid-cols-4 gap-4 mb-6 font-almarai">
          {[
            {
              label: t('formResults.totalResponses'),
              value: (
                <span className="text-[#111851]   font-bold font-almarai font-almarai  font-almarai">
                  {responseCount}{" "}
                </span>
              ),

              icon: (
                <svg
                  width="61"
                  height="60"
                  viewBox="0 0 61 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.21"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.558594 30V37C0.558594 49.7025 10.856 60 23.5586 60H30.5586H37.5586C50.2611 60 60.5586 49.7025 60.5586 37V30V23C60.5586 10.2975 50.2611 0 37.5586 0H30.5586H23.5586C10.856 0 0.558594 10.2975 0.558594 23V30Z"
                    fill="#E43DFE"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.5586 24.3162L28.4591 31.7643C28.598 31.8445 28.7437 31.9024 28.8919 31.9392V46.3844L16.4787 39.0382C15.9084 38.7007 15.5586 38.0873 15.5586 37.4246V24.3162ZM45.5586 24.1182V37.4246C45.5586 38.0873 45.2088 38.7007 44.6385 39.0382L32.2253 46.3844V31.8126C32.2555 31.7975 32.2855 31.7814 32.3151 31.7643L45.5586 24.1182Z"
                    fill="#E43DFE"
                  />
                  <path
                    opacity="0.499209"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.9629 20.7014C16.1205 20.5024 16.3194 20.3343 16.5512 20.2108L29.6762 13.2201C30.2272 12.9266 30.8881 12.9266 31.4391 13.2201L44.5641 20.2108C44.7429 20.306 44.902 20.4277 45.0377 20.5697L30.6476 28.8778C30.5529 28.9325 30.4657 28.995 30.3862 29.064C30.3067 28.995 30.2194 28.9325 30.1248 28.8778L15.9629 20.7014Z"
                    fill="#E43DFE"
                  />
                </svg>
              ),
            },
            {
              label: t('formResults.completed'),
              value: (
                <div className="flex flex-col items-center justify-center space-y-1">
                  <span className="text-4xl font-extrabold text-[#111851] leading-tight">
                    {stats?.completedResponses}
                    <span className="flex items-baseline text-xl text-indigo-600">
                      {(
                        (stats?.completedResponses / responseCount) *
                        100
                      ).toFixed(0)}
                      <span className="text-xl font-almarai opacity-80">
                        %
                      </span>
                    </span>
                  </span>
                </div>
              ),

              icon: (
                <svg
                  width="61"
                  height="60"
                  viewBox="0 0 61 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.21"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.560547 30V37C0.560547 49.7025 10.858 60 23.5605 60H30.5605H37.5605C50.2631 60 60.5605 49.7025 60.5605 37V30V23C60.5605 10.2975 50.2631 0 37.5605 0H30.5605H23.5605C10.858 0 0.560547 10.2975 0.560547 23V30Z"
                    fill="#4AD991"
                  />
                  <path
                    d="M19.6717 40.8889H43.005C43.8641 40.8889 44.5605 41.5853 44.5605 42.4444C44.5605 43.3036 43.8641 44 43.005 44H18.1161C17.257 44 16.5605 43.3036 16.5605 42.4444V17.5556C16.5605 16.6964 17.257 16 18.1161 16C18.9752 16 19.6717 16.6964 19.6717 17.5556V40.8889Z"
                    fill="#4AD991"
                  />
                  <path
                    opacity="0.5"
                    d="M25.4736 34.175C24.886 34.8017 23.9016 34.8335 23.2749 34.2459C22.6481 33.6583 22.6163 32.6739 23.2039 32.0472L29.0373 25.8249C29.6055 25.2188 30.5498 25.1662 31.1818 25.7056L35.7859 29.6343L41.7845 22.0361C42.3168 21.3618 43.295 21.2467 43.9693 21.779C44.6436 22.3114 44.7587 23.2895 44.2264 23.9638L37.2264 32.8305C36.6796 33.5231 35.6669 33.6227 34.9957 33.0499L30.2916 29.0358L25.4736 34.175Z"
                    fill="#4AD991"
                  />
                </svg>
              ),
            },
            {
              label: t('formResults.partial'),
              value: (
                <div className="flex flex-col items-center justify-center space-y-1">
                  <span className="text-4xl font-extrabold text-[#111851] leading-tight">
                    {stats?.incompleteResponses}
                  </span>

                  <span className="flex items-baseline text-xl text-indigo-600">
                    {(
                      (stats?.incompleteResponses / responseCount) *
                      100
                    ).toFixed(0)}
                    <span className="text-xl font-almarai opacity-80">%</span>
                  </span>
                </div>
              ),
              icon: (
                <svg
                  width="61"
                  height="60"
                  viewBox="0 0 61 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.21"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.119141 30V37C0.119141 49.7025 10.4166 60 23.1191 60H30.1191H37.1191C49.8217 60 60.1191 49.7025 60.1191 37V30V23C60.1191 10.2975 49.8217 0 37.1191 0H30.1191H23.1191C10.4166 0 0.119141 10.2975 0.119141 23V30Z"
                    fill="#D9C84A"
                  />
                  <path
                    d="M42.1072 34.563L33.8405 19.683C32.7297 17.6809 31.1926 16.583 29.5005 16.583C27.8084 16.583 26.2714 17.6809 25.1605 19.683L16.8939 34.563C15.8476 36.4618 15.7314 38.283 16.5709 39.7168C17.4105 41.1505 19.0639 41.9384 21.2339 41.9384H37.7672C39.9372 41.9384 41.5905 41.1505 42.4301 39.7168C43.2697 38.283 43.1534 36.4488 42.1072 34.563ZM28.5318 25.6247C28.5318 25.0951 28.9709 24.6559 29.5005 24.6559C30.0301 24.6559 30.4693 25.0951 30.4693 25.6247V32.083C30.4693 32.6126 30.0301 33.0518 29.5005 33.0518C28.9709 33.0518 28.5318 32.6126 28.5318 32.083V25.6247ZM30.4176 36.8751C30.353 36.9268 30.2884 36.9784 30.2239 37.0301C30.1464 37.0818 30.0689 37.1205 29.9914 37.1463C29.9139 37.1851 29.8364 37.2109 29.7459 37.2238C29.6684 37.2368 29.578 37.2497 29.5005 37.2497C29.423 37.2497 29.3326 37.2368 29.2422 37.2238C29.1647 37.2109 29.0872 37.1851 29.0097 37.1463C28.9322 37.1205 28.8547 37.0818 28.7772 37.0301C28.7126 36.9784 28.648 36.9268 28.5834 36.8751C28.3509 36.6297 28.2089 36.2938 28.2089 35.958C28.2089 35.6222 28.3509 35.2863 28.5834 35.0409C28.648 34.9893 28.7126 34.9376 28.7772 34.8859C28.8547 34.8343 28.9322 34.7955 29.0097 34.7697C29.0872 34.7309 29.1647 34.7051 29.2422 34.6922C29.4101 34.6534 29.5909 34.6534 29.7459 34.6922C29.8364 34.7051 29.9139 34.7309 29.9914 34.7697C30.0689 34.7955 30.1464 34.8343 30.2239 34.8859C30.2884 34.9376 30.353 34.9893 30.4176 35.0409C30.6501 35.2863 30.7922 35.6222 30.7922 35.958C30.7922 36.2938 30.6501 36.6297 30.4176 36.8751Z"
                    fill="#FFAE4C"
                  />
                </svg>
              ),
            },
            {
              label: t('formResults.averageResponseTime'),
              value: (
                <span className="text-[#111851] font-black mb-6">
                  {stats?.avgResponseTime} s
                </span>
              ),

              icon: (
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.3"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                    fill="#FF9066"
                  />
                  <path
                    opacity="0.78"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M28.6319 23.8093C28.6519 23.5488 28.8692 23.3477 29.1304 23.3477H29.5482C29.8051 23.3477 30.0202 23.5423 30.0458 23.7979L30.6674 30.0143L35.0821 32.537C35.2379 32.626 35.3341 32.7917 35.3341 32.9712V33.3597C35.3341 33.6894 35.0206 33.9288 34.7025 33.8421L28.3994 32.123C28.168 32.0599 28.014 31.8414 28.0324 31.6023L28.6319 23.8093Z"
                    fill="#FF9066"
                  />
                  <path
                    opacity="0.901274"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22.7218 14.9846C22.4577 14.6698 21.9477 14.7903 21.8524 15.19L20.2189 22.0381C20.1412 22.3638 20.3993 22.6723 20.7336 22.6533L27.7783 22.2541C28.1892 22.2308 28.3976 21.7488 28.133 21.4335L26.3316 19.2867C27.4965 18.8886 28.7317 18.6807 30 18.6807C36.2592 18.6807 41.3333 23.7548 41.3333 30.014C41.3333 36.2733 36.2592 41.3474 30 41.3474C23.7408 41.3474 18.6667 36.2733 18.6667 30.014C18.6667 28.9633 18.809 27.9341 19.0864 26.945L16.5188 26.2248C16.1808 27.43 16 28.7009 16 30.014C16 37.746 22.268 44.014 30 44.014C37.732 44.014 44 37.746 44 30.014C44 22.2821 37.732 16.014 30 16.014C28.0551 16.014 26.2029 16.4106 24.5197 17.1273L22.7218 14.9846Z"
                    fill="#FF9066"
                  />
                </svg>
              ),
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div>
                <p className="mb-2 text-gray-500">{stat.label}</p>
                <h3 className="mb-4 text-4xl font-black">{stat.value}</h3>
              </div>
              <div className="flex items-center justify-center w-14 h-14">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
        {/* 
        {surveys && responses.length > 0 && (
          <div>
            {surveys?.json.pages.map((page:any, pageIndex:any) => (
              <div key={pageIndex}>
                <h2>{page.title}</h2>
                {page.elements.map((question:any, index:any) => {
                  return (
                    <div key={index} style={{ marginBottom: "1rem" }}>
                      <p>
                        <strong>{question.title}</strong>
                      </p>

                      {responses?.map((responseObj, i) => {
                        const answer = responseObj.responses[question.name];

                        if (
                          question.type === "matrix" &&
                          typeof answer === "object"
                        ) {
                          return (
                            <div key={i}>
                              {Object.entries(answer).map(
                                ([rowKey, colValue]) => (
                                  <p key={rowKey}>
                                    ➤ {rowKey}:{" "}
                                    {typeof colValue === "object"
                                      ? JSON.stringify(colValue)
                                      : colValue}
                                  </p>
                                )
                              )}
                            </div>
                          );
                        }

                        // Pour tout le reste
                        return (
                          <p key={i} style={{ paddingLeft: "10px" }}>
                            ➤{" "}
                            {typeof answer === "object"
                              ? JSON.stringify(answer)
                              : String(answer || "Non répondu")}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )} */}

        {/* Tabs Navigation and Content */}
        <Tabs.Root defaultValue="responses" className="space-y-6 rounded mt-10">
          <div className="bg-[#8b5cf6] rounded-t-lg">
            <Tabs.List className="flex space-x-1 px-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Tabs.Trigger
                    key={tab.id}
                    value={tab.id}
                    className="group px-6 py-3 text-sm font-almarai text-white/70 hover:text-white border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:text-white focus:outline-none transition-all duration-200 flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </Tabs.Trigger>
                );
              })}
            </Tabs.List>
          </div>

          {tabs.map((tab) => (
            <Tabs.Content key={tab.id} value={tab.id} className="outline-none">
              {renderTabContent(tab.id)}
            </Tabs.Content>
          ))}
        </Tabs.Root>

        <ResponseDetailsSlideOver
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          response={selectedResponse}
        />
      </div>
    </div>
  );
}

// Dummy response data for testing
const dummyResponses: ResponseDetails[] = [
  {
    id: "1",
    submissionStarted: "2024-02-20T10:30:00Z",
    lastUpdated: "2024-02-20T10:35:23Z",
    submissionType: "web",
    status: "complete",
    currentPage: "Thank You",
    browser: "Chrome 121.0",
    os: "Windows 11",
    network: "Broadband",
    networkId: "AS12345",
    ipAddress: "192.168.1.1",
    answers: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "123 Main St",
      city: "Berlin",
      state: "Berlin",
      satisfied: "Yes",
    },
    metadata: {
      timeSpent: "5m 23s",
      pagesVisited: 4,
      completionRate: 100,
    },
  },
  {
    id: "2",
    submissionStarted: "2024-02-21T09:00:00Z",
    lastUpdated: "2024-02-21T09:05:12Z",
    submissionType: "mobile",
    status: "partial",
    currentPage: "Checkout",
    browser: "Safari 16.0",
    os: "iOS 16",
    network: "WiFi",
    networkId: "AS67890",
    ipAddress: "192.168.2.5",
    answers: {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1987654321",
      address: "456 Oak Avenue",
      city: "Munich",
      state: "Bavaria",
      satisfied: "No",
    },
    metadata: {
      timeSpent: "3m 10s",
      pagesVisited: 2,
      completionRate: 50,
    },
  },
  {
    id: "3",
    submissionStarted: "2024-02-22T15:15:00Z",
    lastUpdated: "2024-02-22T15:20:45Z",
    submissionType: "web",
    status: "complete",
    currentPage: "Thank You",
    browser: "Edge 112.0",
    os: "Windows 10",
    network: "Fiber",
    networkId: "AS54321",
    ipAddress: "192.168.3.10",
    answers: {
      fullName: "Alice Brown",
      email: "alice.brown@example.com",
      phone: "+49123456789",
      address: "789 Pine Road",
      city: "Hamburg",
      state: "Hamburg",
      satisfied: "Yes",
    },
    metadata: {
      timeSpent: "5m 45s",
      pagesVisited: 5,
      completionRate: 100,
    },
  },
  {
    id: "4",
    submissionStarted: "2024-02-23T08:20:00Z",
    lastUpdated: "2024-02-23T08:25:30Z",
    submissionType: "mobile",
    status: "invalid",
    currentPage: "Error Page",
    browser: "Chrome 120.0",
    os: "Android 12",
    network: "Mobile Data",
    networkId: "AS67890",
    ipAddress: "192.168.4.11",
    answers: {
      fullName: "Bob White",
      email: "bob.white@example.com",
      phone: "+442071234567",
      address: "101 Elm Street",
      city: "Frankfurt",
      state: "Hesse",
      satisfied: "No",
    },
    metadata: {
      timeSpent: "1m 30s",
      pagesVisited: 1,
      completionRate: 20,
    },
  },
  {
    id: "5",
    submissionStarted: "2024-02-24T14:00:00Z",
    lastUpdated: "2024-02-24T14:05:20Z",
    submissionType: "web",
    status: "partial",
    currentPage: "Survey",
    browser: "Firefox 113.0",
    os: "MacOS Ventura",
    network: "Broadband",
    networkId: "AS56789",
    ipAddress: "192.168.5.12",
    answers: {
      fullName: "Charlie Green",
      email: "charlie.green@example.com",
      phone: "+4915781234567",
      address: "202 Willow Lane",
      city: "Cologne",
      state: "North Rhine-Westphalia",
      satisfied: "Yes",
    },
    metadata: {
      timeSpent: "3m 50s",
      pagesVisited: 3,
      completionRate: 60,
    },
  },
  {
    id: "6",
    submissionStarted: "2024-02-21T09:00:00Z",
    lastUpdated: "2024-02-21T09:05:12Z",
    submissionType: "mobile",
    status: "partial",
    currentPage: "Checkout",
    browser: "Safari 16.0",
    os: "iOS 16",
    network: "WiFi",
    networkId: "AS67890",
    ipAddress: "192.168.2.5",
    answers: {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1987654321",
      address: "456 Oak Avenue",
      city: "Munich",
      state: "Bavaria",
      satisfied: "No",
    },
    metadata: {
      timeSpent: "3m 10s",
      pagesVisited: 2,
      completionRate: 50,
    },
  },
  // Add more entries as needed
];