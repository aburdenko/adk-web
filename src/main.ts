/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import {APP_INITIALIZER, importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {routes} from './app/app-routing.module';
import {AgentService} from './app/core/services/agent.service';
import {ArtifactService} from './app/core/services/artifact.service';
import {DownloadService} from './app/core/services/download.service';
import {EvalService} from './app/core/services/eval.service';
import {EventService} from './app/core/services/event.service';
import {FeatureFlagService} from './app/core/services/feature-flag.service';
import {FeedbackServiceImpl} from './app/core/services/feedback.service';
import {GraphService} from './app/core/services/graph.service';
import {AGENT_SERVICE} from './app/core/services/interfaces/agent';
import {ARTIFACT_SERVICE} from './app/core/services/interfaces/artifact';
import {DOWNLOAD_SERVICE} from './app/core/services/interfaces/download';
import {EVAL_SERVICE} from './app/core/services/interfaces/eval';
import {EVENT_SERVICE} from './app/core/services/interfaces/event';
import {FEATURE_FLAG_SERVICE} from './app/core/services/interfaces/feature-flag';
import {FEEDBACK_SERVICE} from './app/core/services/interfaces/feedback';
import {GRAPH_SERVICE} from './app/core/services/interfaces/graph';
import {LOCAL_FILE_SERVICE} from './app/core/services/interfaces/localfile';
import {SAFE_VALUES_SERVICE} from './app/core/services/interfaces/safevalues';
import {SESSION_SERVICE} from './app/core/services/interfaces/session';
import {LocalFileServiceImpl} from './app/core/services/local-file.service';
import {SafeValuesServiceImpl} from './app/core/services/safevalues.service';
import {SessionService} from './app/core/services/session.service';
import {RuntimeConfigUtil} from './utils/runtime-config-util';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {provideAnimations} from '@angular/platform-browser/animations';
import {STREAM_CHAT_SERVICE} from './app/core/services/interfaces/stream-chat';
import {STRING_TO_COLOR_SERVICE} from './app/core/services/interfaces/string-to-color';
import {TRACE_SERVICE} from './app/core/services/interfaces/trace';
import {Location} from '@angular/common';
import {LOCATION_SERVICE} from './app/core/services/location.service';
import {StreamChatService} from './app/core/services/stream-chat.service';
import {StringToColorServiceImpl} from './app/core/services/string-to-color.service';
import {TraceService} from './app/core/services/trace.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(MatDialogModule),
    {
      provide: APP_INITIALIZER,
      useFactory: () => RuntimeConfigUtil.loadRuntimeConfig(),
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (featureFlagService: FeatureFlagService) => () => {},
      deps: [FEATURE_FLAG_SERVICE],
      multi: true,
    },
    {provide: AGENT_SERVICE, useClass: AgentService},
    {provide: ARTIFACT_SERVICE, useClass: ArtifactService},
    {provide: DOWNLOAD_SERVICE, useClass: DownloadService},
    {provide: EVENT_SERVICE, useClass: EventService},
    {provide: EVAL_SERVICE, useClass: EvalService},
    {provide: FEATURE_FLAG_SERVICE, useClass: FeatureFlagService},
    {provide: FEEDBACK_SERVICE, useClass: FeedbackServiceImpl},
    {provide: GRAPH_SERVICE, useClass: GraphService},
    {provide: LOCAL_FILE_SERVICE, useClass: LocalFileServiceImpl},
    {provide: LOCATION_SERVICE, useClass: Location},
    {provide: SAFE_VALUES_SERVICE, useClass: SafeValuesServiceImpl},
    {provide: SESSION_SERVICE, useClass: SessionService},
    {provide: STREAM_CHAT_SERVICE, useClass: StreamChatService},
    {provide: STRING_TO_COLOR_SERVICE, useClass: StringToColorServiceImpl},
    {provide: TRACE_SERVICE, useClass: TraceService},
  ],
});
