import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Btn from '../components/Btn';
import Modal from '../components/CommonModal';
import EditInfoInput from '../components/EditInfoInput';
import defaultProfileImg from './img/card_img.png';

const HeaderStyle = styled.div`
    margin-top: 220px;
    margin-bottom: 172px;
    font-weight: bold;
    font-size: 40px;
    display: flex;
    justify-content: center;
`;

const ArticleStyle = styled.div `
    margin-bottom: 100px;
    // 원래는 274px
`;

const BeforeCheckStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MiniProfile = styled.div`
    width: 214px;
    height: 274px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const MiniProfileName = styled.div`
    margin-top: 33px;
    font-size: 28px;
    display: flex;
    justify-content: center;
    line-height: 1;
`;

const CheckPassword = styled.div`
    margin-left: 66px;
    width: 495px;
    height: 222px;
    display: flex;
    flex-direction: column;
`;

const CheckPasswordText = styled.div`
    font-size: 24px;
`;

// const CheckPasswordInput = styled.input`
//     margin-top: 20px;
//     margin-bottom: 60px;
//     padding-left: 16px;
//     width: 474px;
//     height: 65px;
//     border-radius: 8px;
//     border: 1px solid #707070;
//     font-size: 16px;

//     &:placeholder {
//         color: #707070;
//     }

//     &:focus {
//         outline: none;
//     }
// `;

const AfterCheckStyle = styled.div `
    // width: 875px;
    // height: 1203px;
    // margin: auto;
    // display: flex;
    // flex-direction: column;
    
    // background-color: #d0d0d0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledContainer = styled.div `
    width: 920px;
    margin-bottom: 50px;
`;

const StyledTitle = styled.div `
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 15px;
`;

const StyledContent = styled.div `
    border: 2px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 0;
    font-size: 18px;
`;

const Line = styled.div`
    position: relative;
    width: 920px;
    height: 2px;
    background-color: #e0e0e0;
    margin-top: 100px;
    margin-bottom: 50px;

    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 10px;  /* 다이아몬드 크기 */
        height: 10px;
        background-color: #e0e0e0; /* 다이아몬드 색상 */
    }

    &:before {
        left: -10px; /* 다이아몬드를 왼쪽으로 배치 */
    }

    &:after {
        right: -10px; /* 다이아몬드를 오른쪽으로 배치 */
    }
`;

const MiniProfileImage = styled.img`
    width: 213px;
    height: 213px;
    border-radius: 180px;
    object-fit: cover;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-top: 30px;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    margin-top: 20px;
    align-items: center;
    position: relative; /* 타이머 위치를 위한 상대 위치 */
`;

const Label = styled.div`
    width: 185px;
    display: flex;
    align-items: center;
    font-size: 20px;
`;

const ErrorStyled = styled.div`
    width: 490px;
    margin: 0 auto;
`;

const ErrorMessage = styled.div`
    color: red; /* 에러 메시지 색상 */
    font-size: 16px; /* 에러 메시지 글자 크기 */
    margin-top: -16px;
`;

const InputField = styled.input`
    width: 448.3px;
    height: 65px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 0 20px;
    font-size: 20px;
    outline: none;

    &:focus {
        border: 1px solid #29613a;
    }
`;

const BtnStyled = styled.div`
    margin-left: 20px;
`;

// 타이머 스타일
const TimerStyled = styled.div`
    position: absolute;
    right: 205px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #555;
`;

// ----------비밀번호 확인 전 Component----------

function BeforeCheck ({ btnClick }) {
    const handleCheck = () => {
        btnClick(true);
    };

    return (
        <BeforeCheckStyle>
            {/* 프로필 */}
            <MiniProfile>
                <MiniProfileImage />
                <MiniProfileName>seoyoung</MiniProfileName>
            </MiniProfile>

            {/* 비밀번호 입력란 */}
            <CheckPassword>
                

                <CheckPasswordText>비밀번호 확인</CheckPasswordText>
                {/* 입력칸 */}
                <EditInfoInput 
                    type='password' 
                    placeholder='비밀번호를 한번 더 입력해주세요.' 
                    style={{ 
                        marginTop: '20px',
                        marginBottom: '65px'
                    }}
                />
                {/* 버튼 */}
                <Btn 
                    text='확인'
                    style={{marginLeft: 'auto'}}
                    onClick={ handleCheck } 
                />

            </CheckPassword>
        </BeforeCheckStyle>
    );
}

// ----------비밀번호 확인 후 Component----------
function AfterCheck () {
    const {
        register,
        handleSubmit,
        watch, // watch 추가
        trigger,
        formState: { isSubmitting, errors },
    } = useForm();
    const [isEmailDisabled, setIsEmailDisabled] = useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [timer, setTimer] = useState(180);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [isCertified, setIsCertified] = useState(false);

    // 이메일 체크 및 인증번호 요청 함수
    const handleEmailCheck = async (event) => {
        event.preventDefault();
        const emailValue = watch('email');
        const isEmailValid = await trigger('email');

        if (!isEmailValid || !emailValue) {
            return;
        }

        setIsCheckingEmail(true);

        // 이메일 중복 체크
        const isDuplicate = await checkEmailDuplicate(emailValue);

        if (isDuplicate) {
            setModalMessage('이미 사용 중인 이메일입니다.');
            setIsModalOpen(true); // 모달을 띄움
            setIsCheckingEmail(false);
            return; // 중복이면 인증번호 절차로 넘어가지 않도록 함
        } else {
            // 중복이 아니면 이메일 인증번호 전송 절차로 넘어감
            setModalMessage(
                '해당 이메일로 인증번호를 전송했습니다. 이메일을 확인해주세요.'
            );
            setIsEmailDisabled(true);
            setTimer(180);
            setIsTimerRunning(true);
            setShowCertificationInput(true); // 인증번호 입력 필드 표시
            setIsModalOpen(true); // 모달을 띄움
        }

        setIsCheckingEmail(false);
    };

    // 타이머가 작동하는 동안 매초마다 시간을 감소시키는 useEffect
    useEffect(() => {
        if (isTimerRunning && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timer === 0) {
            setIsTimerRunning(false);
            setIsEmailDisabled(false); // 타이머 종료 시 버튼 활성화
        }
    }, [timer, isTimerRunning]);

    useEffect(() => {
        // 이메일 변경될 때 타이머와 버튼 상태 초기화
        setTimer(180);
        setIsTimerRunning(false);
        setShowCertificationInput(false);
        setIsEmailDisabled(false);
    }, [watch('email')]);

    const handleCertificationCheck = async () => {
        const enteredCode = watch('certificationNum');
        const correctCode = '123456'; // 이곳에 실제 인증번호 로직 적용

        if (enteredCode === correctCode) {
            setModalMessage('인증이 성공했습니다.');
            setIsCertified(true);
            setShowCertificationInput(false); // 인증번호 필드 숨기기
            setIsTimerRunning(false); // 타이머 정지
        } else {
            setModalMessage('인증에 실패했습니다. 다시 시도해주세요.');
            setIsCertified(false);
            setShowCertificationInput(false);
            setIsTimerRunning(false);
        }

        setIsModalOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage(''); // 메시지 초기화
    };

    // 가정된 API 호출 함수 (실제 API 로직으로 대체 필요)
    const checkEmailDuplicate = async (email) => {
        const dummyExistingEmails = [
            'existingemail@domain.com',
            'test3@example.com',
        ];
        return dummyExistingEmails.includes(email);
    };

    const [profileImg, setProfileImg] = useState(defaultProfileImg);

    // 파일 선택을 위한 함수
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {  // 이미지 파일인지 확인
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImg(reader.result);  // 프로필 이미지 상태 업데이트
            };
            reader.readAsDataURL(file);  // 이미지를 base64로 변환하여 미리보기 표시
        }
    };

    // 기본 이미지로 설정하는 함수
    const handleSetDefaultImage = () => {
        setProfileImg(defaultProfileImg);
    };

    // 수정하기 버튼 클릭 시 콘솔 메시지 출력
    const handleSaveChanges = () => {
        console.log('프로필 사진 변경 완료');
    };

    // 파일 입력 클릭을 트리거하는 함수
    const triggerFileInput = () => {
        document.getElementById("fileInput").click();
    };

    // 회원 탈퇴 함수
    const handleDeleteId = () => {
        console.log('회원 탈퇴 완료');
    }

    return (
        <AfterCheckStyle>
            {/* 프로필 사진 */}
            <StyledContainer>
                <StyledTitle>프로필 사진</StyledTitle>
                <StyledContent>
                    {/* 프로필 이미지 클릭 시 파일 선택 창 열기 */}
                    <MiniProfileImage 
                        src={profileImg} 
                        alt="Profile Image" 
                        onClick={triggerFileInput}  // 이미지 클릭 시 파일 선택 트리거
                    />

                    {/* 파일 선택 input 및 버튼 */}
                    <ButtonContainer>
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: 'none' }}  // 화면에 안 보이도록 숨김
                            accept="image/*"  // 이미지 파일만 선택 가능하도록 제한
                            onChange={handleImageChange}
                        />

                        <Btn 
                            width='140px'
                            height='41px'
                            borderColor='#f4a192'
                            backgroundColor='#fff'
                            color='#f4a192'
                            text='기본 이미지'
                            onClick={handleSetDefaultImage}
                        />
                        <Btn 
                            width='140px'
                            height='41px'
                            fontWeight='bold'
                            text='저장'
                            onClick={handleSaveChanges}
                        />
                    </ButtonContainer>
                </StyledContent>
            </StyledContainer>

            {/* 개인정보 수정 */}
            <StyledContainer>
                <StyledTitle>개인정보 수정</StyledTitle>
                <StyledContent>
                    <form
                    noValidate
                    onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
                    >
                        {/*아이디 */}
                        <InputContainer style={{ marginBottom: '50px' }}>
                            <Label>아이디</Label>
                            <span>baeksy1234</span>
                        </InputContainer>

                        <InputContainer style={{ marginBottom: '35px' }}>
                            <Label>
                                비밀번호
                            </Label>
                            <InputField
                                id="password"
                                type="password"
                                placeholder="*********"
                                {...register('password', {
                                    required: '비밀번호는 필수 입력입니다.',
                                    minLength: {
                                        value: 10,
                                        message: '최소 10자 이상 입력해주세요.',
                                    },
                                    validate: {
                                        containsSpecialChar: (value) =>
                                            /(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?~-])/.test(
                                                value
                                            ) || '특수 문자가 포함되어야 합니다.',
                                        containsNumber: (value) =>
                                            /(?=.*\d)/.test(value) ||
                                            '숫자가 포함되어야 합니다.',
                                        containsLetter: (value) =>
                                            /(?=.*[a-zA-Z])/.test(value) ||
                                            '영문자가 포함되어야 합니다.',
                                    },
                                })}
                                onChange={(e) => {
                                    register('password').onChange(e);
                                    trigger('password'); // 유효성 검사 트리거
                                }}
                                aria-invalid={errors.password ? 'true' : 'false'}
                            />
                        </InputContainer>
                        <ErrorStyled>
                            {errors.password && (
                                <ErrorMessage>{errors.password.message}</ErrorMessage>
                            )}
                        </ErrorStyled>

                        <InputContainer style={{ marginBottom: '50px' }}>
                            <Label>
                                비밀번호 확인
                            </Label>
                            <InputField
                                id="PasswordConfirm"
                                type="password"
                                placeholder="비밀번호 확인"
                                {...register('passwordConfirm', {
                                    required: '동일한 비밀번호를 입력해주세요.',
                                    validate: {
                                        matchesPreviousPassword: (value) =>
                                            value === watch('password') ||
                                            '비밀번호가 일치하지 않습니다.',
                                    },
                                })}
                                onChange={(e) => {
                                    register('passwordConfirm').onChange(e);
                                    trigger('passwordConfirm'); // 유효성 검사 트리거
                                }}
                                aria-invalid={errors.passwordConfirm ? 'true' : 'false'}
                            />
                        </InputContainer>
                        <ErrorStyled>
                            {errors.passwordConfirm && (
                                <ErrorMessage>
                                    {errors.passwordConfirm.message}
                                </ErrorMessage>
                            )}
                        </ErrorStyled>

                        {/* 이름 */}
                        <InputContainer style={{ marginBottom: '70px' }}>
                            <Label>이름</Label>
                            <span>백서영</span>
                        </InputContainer>

                        {/* 전화번호 */}
                        <InputContainer style={{ marginBottom: '50px' }}>
                            <Label>전화번호</Label>
                            <span>010-0000-0000</span>
                        </InputContainer>

                        {/* 이메일 */}
                        <InputContainer style={{ marginBottom: '35px' }}>
                            <Label>
                                이메일
                            </Label>

                            <InputField
                                id="email"
                                type="email"
                                placeholder="ex) yeogida@travel.com"
                                {...register('email', {
                                    required: '이메일은 필수 입력입니다.',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: '이메일 형식이 맞지 않습니다',
                                    },
                                })}
                                onChange={(e) => {
                                    register('email').onChange(e);
                                    trigger('email'); // 유효성 검사 트리거
                                }}
                                aria-invalid={errors.email ? 'true' : 'false'}
                            />
                            <BtnStyled>
                                <Btn
                                    width="170px"
                                    height="65px"
                                    borderRadius="10px"
                                    fontSize="20px"
                                    text="인증번호 받기"
                                    type="button" // 버튼 타입을 submit에서 button으로 변경
                                    onClick={handleEmailCheck}
                                    disabled={
                                        isEmailDisabled || !!errors.email || !watch('email')
                                    }
                                />
                            </BtnStyled>
                        </InputContainer>

                        <ErrorStyled>
                            {errors.email && (
                                <ErrorMessage>{errors.email.message}</ErrorMessage>
                            )}
                        </ErrorStyled>
                        {/* 인증번호 */}
                        {showCertificationInput && (
                            <InputContainer>
                                <Label></Label>

                                <InputField
                                    id="certificationNum"
                                    type="tel"
                                    placeholder="인증번호 6자리를 입력해주세요."
                                    {...register('certificationNum', {
                                        maxLength: { value: 6 },
                                    })}
                                    onChange={(e) => {
                                        register('certificationNum').onChange(e);
                                        trigger('certificationNum'); // 유효성 검사 트리거
                                    }}
                                    aria-invalid={
                                        errors.certificationNum ? 'true' : 'false'
                                    }
                                />
                                <BtnStyled>
                                    <Btn
                                        width="170px"
                                        height="65px"
                                        borderRadius="10px"
                                        fontSize="20px"
                                        text="인증번호 확인"
                                        type="button" // 버튼 타입을 submit에서 button으로 변경
                                        onClick={handleCertificationCheck}
                                        disabled={!watch('certificationNum')}
                                    />
                                </BtnStyled>
                                {/* 타이머가 작동 중일 때만 타이머 표시 */}
                                {isTimerRunning && (
                                    <TimerStyled>
                                        {Math.floor(timer / 60)}:{timer % 60}
                                    </TimerStyled>
                                )}
                            </InputContainer>
                        )}

                        {/* 닉네임 */}
                        <InputContainer style={{ marginBottom: '50px' }}>
                            <Label>닉네임</Label>
                            <InputField />
                        </InputContainer>

                        {/* 생년월일 */}
                        <InputContainer style={{ marginBottom: '85px' }}>
                            <Label>생년월일</Label>
                            <span>2000 / 07 / 20</span>
                        </InputContainer>

                        {/* Modal for alerts */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal} // Changed from onClose to onRequestClose
                            title={modalMessage}
                        />
                    </form>
                    <Btn 
                        width='240px'
                        height='82px'
                        fontWeight='bold'
                        fontSize='26px'
                        borderRadius='15px'
                        text='수정하기'
                    />
                </StyledContent>
            </StyledContainer>

            <Line />

            {/* 문의하기 */}
            <StyledContainer>
                <StyledTitle>문의하기</StyledTitle>
                <StyledContent>
                    <span>
                        여기다 웹사이트 관련 문의사항은 <b>swuweb0320@gmail.com</b>으로 보내주시면 감사하겠습니다.
                    </span>
                </StyledContent>
            </StyledContainer>

            {/* 회원 탈퇴 */}
            <StyledContainer>
                <StyledTitle>회원 탈퇴</StyledTitle>
                <StyledContent>
                    <ul style={{ margin: 0 }}>
                        <li>
                            원활한 회원 정보 관리를 위해 회원 탈퇴 후 30일 간 탈퇴한 회원의 개인정보와 여행 일정 정보가 보존됩니다.
                            <br />31일 후부터 같은 회원 정보로 재가입이 가능합니다.
                        </li>
                        <li>
                            <p>한번 탈퇴를 신청하면 취소할 수 없습니다.</p>
                        </li>
                    </ul>
                    <Btn 
                            width='180px'
                            height='55px'
                            borderRadius='15px'
                            borderColor='#f4a192'
                            backgroundColor='#fff'
                            color='#f4a192'
                            fontSize='20px'
                            text='회원 탈퇴'
                            style={{ marginTop: '12px' }}
                            onClick={handleDeleteId}
                        />
                </StyledContent>
            </StyledContainer>

        </AfterCheckStyle>
    );
}

// ----------메인 Component----------

export default function EditInfo() {
    const [isBtnClicked, setIsBtnClicked] = useState(false);

    return (
        <section>
            {/* 헤더 */}
            <header>
                <HeaderStyle>개인정보 수정</HeaderStyle>
            </header>

            {/* 비밀번호 확인 */}
            <article>
                <ArticleStyle>
                    {/* 
                    
                    {isBtnClicked ? (
                        // 비밀번호 확인 성공하면 개인정보 수정 페이지 렌더링
                        <AfterCheck />
                    ) : (
                        // 처음에는 비밀번호 확인 페이지 렌더링
                        <BeforeCheck btnClick={setIsBtnClicked} />
                    )}
                    {/* <AfterCheck /> */}

                    <AfterCheck />
                </ArticleStyle>
            </article>
        </section>
    );
}
