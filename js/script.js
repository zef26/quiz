document.addEventListener('DOMContentLoaded', function () {

    let quiz = document.querySelector('#quis');
    let headCall = document.querySelector('.head-call')


   
    console.log(quiz , headCall);
    

    let showResult = false;

    const step1Buttons = document.querySelectorAll('#step1 button');

    if (step1Buttons.length >= 2) {
        step1Buttons[0].addEventListener('click', () => {
            showResult = true;
            nextStep('step2');
        });
        step1Buttons[1].addEventListener('click', () => {
            showResult = false;
            nextStep('step2');
        });
    }

    const step2Buttons = document.querySelectorAll('#step2 button');
    step2Buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const step2 = document.getElementById('step2');
            if (step2) {
                step2.style.opacity = '0';
                step2.style.transition = 'opacity 0.3s ease-out';
                setTimeout(() => {
                    step2.style.display = 'none';

                    // ✅ Отправка событий Meta Pixel после второго вопроса
                    fbq('trackCustom', 'QuizCompleted');
                    fbq('trackCustom', 'PhoneReveal');
                    console.log('✅ Pixel events: QuizCompleted & PhoneReveal');

                    startFinalSequence(); // запуск финальной логики
                }, 100);
            }
        });
    });

    function startFinalSequence() {
        const loading = document.getElementById('loading-block');
        const steps = [
            document.getElementById('text-1'),
            document.getElementById('text-2'),
            document.getElementById('text-3')
        ].filter(step => step);
        const result = document.getElementById('result-block');

        if (!loading || steps.length !== 3) return;

        loading.style.display = 'block';
        loading.style.opacity = '0';
        loading.style.transition = 'opacity 0.5s ease-in';
        loading.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
            loading.style.opacity = '1';
        }, 100);

        let current = 0;

        function showNextStep() {
            if (current > 0) {
                const prevStep = steps[current - 1];
                prevStep.classList.remove('show');
                prevStep.style.opacity = '0';
                prevStep.style.display = 'none';
            }

            if (current < steps.length) {
                const currentStep = steps[current];
                currentStep.style.display = 'block';
                currentStep.style.opacity = '0';
                currentStep.classList.add('show');
                currentStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    currentStep.style.transition = 'opacity 0.5s ease-in, transform 0.5s ease-in';
                    currentStep.style.opacity = '1';
                    currentStep.style.transform = 'translateY(0)';
                }, 50);
                setTimeout(showNextStep, 100);
                current++;
            } else {
                setTimeout(() => {
                    loading.style.opacity = '0';
                    setTimeout(() => {
                        loading.style.display = 'none';
                        if (showResult && result) {
                            result.style.display = 'block';
                            result.style.opacity = '0';
                            result.style.transform = 'translateY(20px)';
                            result.style.transition = 'opacity 0.5s ease-in, transform 0.5s ease-in';
                             quiz.style.display = 'none';
                            headCall.style.display = 'block'
                            
                            setTimeout(() => {
                                result.classList.add('show');
                                result.style.opacity = '1';
                                result.style.transform = 'translateY(0)';
                                result.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 50);
                        }
                    }, 100);
                }, 100);
            }
        }

        // Подготовка анимаций
        steps.forEach((step) => {
            step.style.transition = 'opacity 0.5s ease-in, transform 0.5s ease-in';
            step.style.transform = 'translateY(20px)';
            step.style.display = 'none';
        });

        showNextStep();
    }

    function nextStep(nextId) {
        const current = document.querySelector('.question:not([style*="display: none"])');
        if (current) {
            current.style.opacity = '0';
            current.style.transition = 'opacity 0.3s ease-out';
            setTimeout(() => {
                current.style.display = 'none';
                const next = document.getElementById(nextId);
                if (next) {
                    next.style.display = 'block';
                    next.style.opacity = '0';
                    next.style.transition = 'opacity 0.3s ease-in';
                    setTimeout(() => {
                        next.style.opacity = '1';
                        next.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                }
            }, 100);
        }
    }

    const anchors = document.querySelectorAll('a[href*="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const blockID = anchor.getAttribute('href').substring(1);
            const target = document.getElementById(blockID);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
