import { useEffect, useState } from 'react';
import { LdaVisData } from '../../types';
import { useRefresh } from '../../context/RefreshContext';
import { useNetworkGet } from '../../network';
import ChartLoadingIcon from '../ChartLoadingIcon';
import { LDAvis } from 'react-ldavis';
import { useModelId } from '../../context/ModelIdContext';
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import { useLdaExport } from '../../tools';

export default function LdaTopicVis(props: { route: string }) {
  const [ldaVisData, setLdaVisData] = useState<LdaVisData | undefined>(undefined);
  const refresh = useRefresh();
  const { modelId } = useModelId();
  const queryKey = props.route + 'Lda';

  const queryParameters = modelId ? { modelId: modelId } : {};

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/lda`,
    queryKey,
    (data) => {
      setLdaVisData(data.outputData);
    },
    queryParameters
  );

  useEffect(() => {
    refresh.addRefetch(queryKey, refetch);
    return () => {
      refresh.removeRefetch(queryKey);
    };
  }, []);

  const filename = useLdaExport(queryParameters);

  function handleClick() {
    if (ldaVisData) {
      // This was taken directly from one of the .html exports of pyLDAvis. We just added our own data.
      const html =
        '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/bmabey/pyLDAvis@3.3.1/pyLDAvis/js/ldavis.v1.0.0.css">\n' +
        '\n' +
        '\n' +
        '<div id="ldavis_el110871405271198671204322117560"></div>\n' +
        '<script type="text/javascript">\n' +
        '\n' +
        'var ldavis_el110871405271198671204322117560_data =' +
        JSON.stringify(ldaVisData) +
        ';\n' +
        '\n' +
        'function LDAvis_load_lib(url, callback){\n' +
        "  var s = document.createElement('script');\n" +
        '  s.src = url;\n' +
        '  s.async = true;\n' +
        '  s.onreadystatechange = s.onload = callback;\n' +
        '  s.onerror = function(){console.warn("failed to load library " + url);};\n' +
        '  document.getElementsByTagName("head")[0].appendChild(s);\n' +
        '}\n' +
        '\n' +
        'if(typeof(LDAvis) !== "undefined"){\n' +
        '   // already loaded: just create the visualization\n' +
        '   !function(LDAvis){\n' +
        '       new LDAvis("#" + "ldavis_el110871405271198671204322117560", ldavis_el110871405271198671204322117560_data);\n' +
        '   }(LDAvis);\n' +
        '}else if(typeof define === "function" && define.amd){\n' +
        '   // require.js is available: use it to load d3/LDAvis\n' +
        '   require.config({paths: {d3: "https://d3js.org/d3.v5"}});\n' +
        '   require(["d3"], function(d3){\n' +
        '      window.d3 = d3;\n' +
        '      LDAvis_load_lib("https://cdn.jsdelivr.net/gh/bmabey/pyLDAvis@3.3.1/pyLDAvis/js/ldavis.v3.0.0.js", function(){\n' +
        '        new LDAvis("#" + "ldavis_el110871405271198671204322117560", ldavis_el110871405271198671204322117560_data);\n' +
        '      });\n' +
        '    });\n' +
        '}else{\n' +
        '    // require.js not available: dynamically load d3 & LDAvis\n' +
        '    LDAvis_load_lib("https://d3js.org/d3.v5.js", function(){\n' +
        '         LDAvis_load_lib("https://cdn.jsdelivr.net/gh/bmabey/pyLDAvis@3.3.1/pyLDAvis/js/ldavis.v3.0.0.js", function(){\n' +
        '                 new LDAvis("#" + "ldavis_el110871405271198671204322117560", ldavis_el110871405271198671204322117560_data);\n' +
        '            })\n' +
        '         });\n' +
        '}\n' +
        '</script>';
      const blob = new Blob([html], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', filename);
      a.click();
    }
  }

  return (
    <div>
      <div style={{ margin: '5px' }} className={'title'}>
        D5: Topic modelling
      </div>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ChartLoadingIcon isFetching={isFetching}>
          {ldaVisData ? (
            <LDAvis data={ldaVisData} modifyHistory={true} />
          ) : (
            <div
              style={{
                color: 'grey',
              }}
            >
              No data
            </div>
          )}
        </ChartLoadingIcon>
        {ldaVisData ? (
          <Button
            onClick={handleClick}
            startIcon={<Download />}
            sx={{ position: 'absolute', top: '66px', left: '5px' }}
          >
            Export
          </Button>
        ) : null}
      </div>
    </div>
  );
}
