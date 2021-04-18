//ES6 const, let
//ES6 Destructuring 
const { Component } = React;

const STAGE_WIDTH = 200;
const STAGE_MARGIN_RIGHT = 32;
const TITLE_HEIGHT = 20;
const JOB_MARGIN_TOP = 8;
const JOB_HEIGHT = 40;
const LINE_HEGHT = 1;
const LINE_CENTER = (JOB_HEIGHT - LINE_HEGHT) / 2 + TITLE_HEIGHT + JOB_MARGIN_TOP;

interface Stage {
    title: string;
    jobs: Job[];
}

interface Job {
    name: string;
    status: 'success' | 'fail';
    time: number; // 毫秒时间戳
}

interface IProps {
    stages: Stage[];
}

const Pipeline: React.FC<IProps> = ({ stages }) => {
    const svgRenderCondition = [];
    stages.forEach((stage, stageIndex) => {
        if (stageIndex >= 1) {
            // 画直线
            svgRenderCondition.push(<line x1={STAGE_WIDTH * stageIndex} y1={LINE_CENTER} x2={STAGE_WIDTH * stageIndex + STAGE_MARGIN_RIGHT} y2={LINE_CENTER} key={`line-${stageIndex}`} stroke='#ccc' stroke-width={LINE_HEGHT} fill='none' />)
        }
        stage.jobs.forEach((job, jobIndex) => {
            if (jobIndex >= 1) {
                svgRenderCondition.push(<path d={`M ${STAGE_WIDTH * stageIndex + STAGE_MARGIN_RIGHT - 12},${LINE_CENTER} C ${STAGE_WIDTH * stageIndex + STAGE_MARGIN_RIGHT - 12 + 15},${LINE_CENTER + 5} ${STAGE_WIDTH * stageIndex + STAGE_MARGIN_RIGHT - 15},${LINE_CENTER + jobIndex * (JOB_HEIGHT + JOB_MARGIN_TOP) - 5} ${STAGE_WIDTH * stageIndex + STAGE_MARGIN_RIGHT},${LINE_CENTER + jobIndex * (JOB_HEIGHT + JOB_MARGIN_TOP)}`} key={`prevPath-${jobIndex}`} stroke='#ccc' stroke-width={LINE_HEGHT} fill='none' />)
                if (stageIndex < stages.length - 1) {
                    // 画曲线
                }
            }
        })
    });


    return (
        <div className="Pipeline">
            {stages.map((stage, stageIndex) => (
                <div className="Pipeline-item" key={stageIndex}>
                    <div className="Pipeline-itemTitle">{stage.title}</div>
                    {stage.jobs.map((job, jobIndex) => (
                        <div className="Pipeline-itemJobItem" key={jobIndex}>
                            <div className="Pipeline-itemJobItemStatus">{job.status}</div>
                            <div className="Pipeline-itemJobItemName">{job.name}</div>
                            <div className="Pipeline-itemJobItemTime">{job.time}</div>
                        </div>
                    ))}
                </div>
            ))}
            <svg className="Pipeline-svg">
                {svgRenderCondition}
            </svg>

        </div>
    );
}


class App extends Component {
    render() {
        return (
            <div>
                <Pipeline stages={[{
                    title: 'asd', jobs: [{
                        name: 'zxc',
                        status: 'asd',
                        time: '00:01:01'
                    }]
                }, {
                    title: 'asd', jobs: [{
                        name: 'zxc',
                        status: 'asd',
                        time: '00:01:01'
                    }, {
                        name: 'zxc',
                        status: 'asd',
                        time: '00:01:01'
                    }]
                },]} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector(".container"));