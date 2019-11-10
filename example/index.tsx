import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import {
//   SkillTree,
//   SkillTreeGroup,
//   SkillProvider,
//   SkillGroupDataType,
//   SavedDataType,
// } from '../src';
import {
  SkillTree,
  SkillTreeGroup,
  SkillProvider,
  SkillGroupDataType,
  SavedDataType,
} from '../dist/index';
import './index.css';
import { legsPushData, legsPullData, hpSavedData } from './mockData';
import { ContextStorage } from '../src/models';

function handleSave(
  storage: ContextStorage,
  treeId: string,
  skills: SavedDataType
) {
  return storage.setItem(`skills-${treeId}`, JSON.stringify(skills));
}

const App = () => {
  return (
    <SkillProvider>
      <SkillTreeGroup theme={{ headingFont: 'impact' }}>
        {({
          skillCount,
          selectedSkillCount,
          resetSkills,
        }: SkillGroupDataType) => {
          const totalSkillCount = skillCount.optional + skillCount.required;
          const totalSelectedCount =
            selectedSkillCount.optional + selectedSkillCount.required;

          return (
            <React.Fragment>
              <nav>
                <ul style={{ margin: '24px' }}>
                  <li>
                    <a href="#sp">Squat Progression</a>
                  </li>
                  <li>
                    <a href="#hp">Hinge Progression</a>
                  </li>
                </ul>
              </nav>
              <div className="Example__header">
                <h2 className="Example__heading">
                  Completed skills: {totalSelectedCount}/{totalSkillCount}
                </h2>
                <button className="Example__reset-button" onClick={resetSkills}>
                  Reset
                </button>
              </div>
              <SkillTree
                treeId="sp"
                title="Squat Progression"
                data={legsPushData}
              />
              <SkillTree
                treeId="hp"
                title="Hinge Progression"
                data={legsPullData}
                savedData={hpSavedData}
                handleSave={handleSave}
              />
            </React.Fragment>
          );
        }}
      </SkillTreeGroup>
    </SkillProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
